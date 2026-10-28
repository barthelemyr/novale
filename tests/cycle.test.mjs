// Replays Novale's full idea cycle in a simulated browser.
// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM, VirtualConsole } from "jsdom";

const HTML = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function boot({ compact = false, lang = "fr", storage = {} } = {}) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => { if (!/Could not parse CSS|Not implemented/.test(e.message)) errors.push(e.message); });
  let clipboard = "";
  const dom = new JSDOM(HTML, {
    runScripts: "dangerously", url: "https://novale.test/", virtualConsole: vc, pretendToBeVisual: true,
    beforeParse(w) {
      w.localStorage.setItem("novale.lang", lang);
      for (const [k, v] of Object.entries(storage)) w.localStorage.setItem(k, v);
      w.matchMedia = q => ({ matches: compact && /759px|520px/.test(q), addEventListener() {} });
      Object.defineProperty(w.navigator, "clipboard", { value: { writeText: async t => { clipboard = t; } } });
      w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
      w.HTMLDialogElement.prototype.close = function () { this.open = false; };
      w.Element.prototype.scrollIntoView = function () {};
    }
  });
  const w = dom.window, d = w.document;
  const $ = s => d.querySelector(s);
  const text = s => ($(s)?.textContent || "").replace(/\s+/g, " ").trim();
  const click = el => { assert.ok(el, "element to click is missing"); el.dispatchEvent(new w.MouseEvent("click", { bubbles: true })); };
  const type = (el, v) => { el.value = v; el.dispatchEvent(new w.Event("input", { bubbles: true })); };
  const store = () => JSON.parse(w.localStorage.getItem("novale.v1") || "{}");
  return { w, d, $, text, click, type, store, errors, clip: () => clipboard };
}
const tick = (ms = 50) => new Promise(r => setTimeout(r, ms));

test("full cycle on desktop: sow, review, ripen, grow, harvest", async () => {
  const a = await (async () => { const x = boot(); await tick(); return x; })();
  const { $, d, text, click, type, store } = a;

  // Sow: desire is required
  $("#capText").value = "Atelier données ouvertes";
  $("#capture").dispatchEvent(new a.w.Event("submit", { cancelable: true }));
  assert.equal(store().items?.length ?? 0, 0, "no idea without a desire");
  click(d.querySelector('[data-cap="3"]'));
  $("#capture").dispatchEvent(new a.w.Event("submit", { cancelable: true }));
  assert.equal(store().items.length, 1);
  assert.equal(store().items[0].statut, "jachere");

  // Open it: resting, next step is the review
  click($("#list .card"));
  assert.match(text(".next"), /Prochaine étape : la relecture/);

  // Early review (reason optional), then review with desire
  click(d.querySelector('[data-act="early"]'));
  click(d.querySelector('[data-act="earlyGo"]'));
  assert.match(text(".next"), /C'est le moment de la relire/);
  assert.ok(d.querySelector('[data-act="ripen"]').disabled, "cannot confirm before rating desire");
  click(d.querySelector('[data-envr="4"]'));
  click(d.querySelector('[data-act="ripen"]'));
  assert.equal(store().items[0].dates.relue.length, 10);

  // Ripen: the four essential questions unlock growing
  for (const k of ["probleme", "fini", "test", "remplace"]) type($("#q_" + k), "réponse " + k);
  click(d.querySelector('[data-sub="cycle"]'));
  const grow = d.querySelector('.next [data-act="form:cultivee"]');
  assert.ok(grow && !grow.disabled, "grow is available with 4 answers");
  click(grow);
  click(d.querySelector('[data-prevm="1"]'));
  click(d.querySelector('[data-act="go:cultivee"]'));
  const grown = store().items[0];
  assert.equal(grown.statut, "cultivee");
  assert.ok(grown.dates.prevue > grown.dates.cultivee, "harvest date in the future");

  // Harvest, handed to someone
  click(d.querySelector('.next [data-act="form:recoltee"]'));
  $("#fA").value = "Service des données";
  $("#fNote").value = "Lancé";
  click(d.querySelector('[data-act="go:recoltee"]'));
  const done = store().items[0];
  assert.equal(done.statut, "recoltee");
  assert.equal(done.transmiseA, "Service des données");
  assert.deepEqual(a.errors, []);
});

test("growing slots are limited", async () => {
  const T = new Date().toISOString().slice(0, 10);
  const grown = id => ({ id, kind: "idee", v: 2, titre: id, idee: id, envie: 3, statut: "cultivee", dates: { semee: T, cultivee: T }, q: {}, journal: [] });
  const ripe = { id: "ripe", kind: "idee", v: 2, titre: "Mûre", idee: "x", envie: 3, statut: "jachere", dates: { semee: T, relue: T },
    q: { probleme: "a", fini: "b", test: "c", remplace: "d" }, journal: [] };
  const a = boot({ storage: { "novale.v1": JSON.stringify({ items: [grown("g1"), grown("g2"), grown("g3"), ripe], prefs: { rest: 7, limit: 3 } }) } });
  await tick();
  a.click(a.d.querySelector('[data-tab="jachere"]'));
  a.click(a.d.querySelector('.card[data-open="ripe"]'));
  assert.ok(a.d.querySelector('.next [data-act="form:cultivee"]').disabled, "no free slot, no growing");
});

test("Obsidian export and import, including legacy French notes", async () => {
  const a = boot({ lang: "en" });
  await tick();
  a.$("#capText").value = "Open data atlas";
  a.click(a.d.querySelector('[data-cap="4"]'));
  a.$("#capture").dispatchEvent(new a.w.Event("submit", { cancelable: true }));
  a.click(a.$("#copyAllBtn"));
  await tick();
  const md = a.clip();
  assert.match(md, /^status: resting$/m);
  assert.match(md, /^desire: 4$/m);
  assert.match(md, /^## What problem, for whom\?$/m);

  const legacy = "---\nid: old1\ntype: idee\nstatut: cultivee\nenvie: 4\nsemee: 2026-09-01\ncultivee: 2026-09-10\ntags:\n  - idee\n  - ia\n---\n\n# Ancienne idée\n\n> Texte\n\n## Quel problème, pour qui ?\n\nLes habitants\n";
  a.click(a.$("#pasteBtn"));
  a.$("#pasteTa").value = md + "\n\n" + legacy;
  a.click(a.$("#pasteGo"));
  const items = a.store().items;
  assert.equal(items.length, 2, "existing idea updated, legacy idea added");
  const old = items.find(i => i.id === "old1");
  assert.equal(old.statut, "cultivee");
  assert.equal(old.q.probleme, "Les habitants");
  assert.deepEqual(old.tags, ["ia"]);
});

test("language switch updates the interface", async () => {
  const a = boot({ lang: "fr" });
  await tick();
  assert.equal(a.$("#capText").placeholder, "Nouvelle idée, en une phrase.");
  const sel = a.$("#setLang");
  sel.value = "en";
  sel.dispatchEvent(new a.w.Event("change", { bubbles: true }));
  assert.equal(a.$("#capText").placeholder, "New idea, in one sentence.");
  assert.match(a.text("#tabs"), /Resting.*Growing.*Archive.*Timeline/);
});

test("phone layout: bottom bar and sowing sheet", async () => {
  const a = boot({ compact: true });
  await tick();
  assert.equal(a.d.querySelectorAll("#bnav [role=tab]").length, 4);
  assert.equal(a.$("#filters").children.length, 0, "no filters on an empty notebook");
  a.click(a.d.querySelector("#list .plot[data-sow]"));
  assert.ok(a.$("#sowDlg").open, "the empty plot invites the first idea");
  a.$("#sowDlg").open = false;
  a.click(a.d.querySelector("#bnav [data-sow]"));
  assert.ok(a.$("#sowDlg").open, "sowing sheet opens");
  a.$("#sowText").value = "Idée du téléphone";
  a.click(a.d.querySelector('[data-sowe="3"]'));
  a.$("#sowForm").dispatchEvent(new a.w.Event("submit", { cancelable: true }));
  assert.equal(a.$("#sowDlg").open, false);
  assert.equal(a.store().items.length, 1);
  a.click(a.$("#logoBtn"));
  assert.ok(a.$("#detail").classList.contains("open"), "Today opens full screen");
});

test("delete everything needs three confirmations", async () => {
  const T = new Date().toISOString().slice(0, 10);
  const idea = id => ({ id, kind: "idee", v: 2, titre: id, idee: id, envie: 3, statut: "jachere", dates: { semee: T, relire: T }, q: {}, journal: [] });
  const a = boot({ storage: { "novale.v1": JSON.stringify({ items: [idea("x1"), idea("x2")], prefs: { rest: 14, limit: 2 } }) } });
  await tick();
  a.click(a.$("#optBtn"));
  a.click(a.d.querySelector('[data-wipe="1"]'));
  assert.match(a.text("#wipeBox"), /2 idées/);
  a.click(a.d.querySelector('[data-wipe="2"]'));
  a.click(a.d.querySelector('[data-wipe="3"]'));
  const go = a.$("#wipeGo");
  assert.ok(go.disabled, "final button locked until the word is typed");
  const word = a.$("#wipeWord");
  word.value = "effac";
  word.dispatchEvent(new a.w.Event("input", { bubbles: true }));
  assert.ok(go.disabled);
  word.value = "EFFACER";
  word.dispatchEvent(new a.w.Event("input", { bubbles: true }));
  assert.equal(go.disabled, false);
  assert.equal(a.store().items.length, 2, "nothing deleted before the final click");
  a.click(go);
  const st = a.store();
  assert.equal(st.items.length, 0);
  assert.equal(st.prefs.rest, 14, "settings are kept");
});
