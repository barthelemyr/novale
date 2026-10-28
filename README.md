# Novale

**Write it down, let it rest, grow what holds.**

Novale is an idea notebook that makes ideas rest before you start them. It is built for people who love new ideas and end up with too many half-started projects.

*Novale* is Latin for a field left to rest, and for land cultivated for the first time: rest first, then a real start.

[Version française](README.fr.md)

## How it works

Every idea goes through the same cycle:

| Stage | What happens |
|---|---|
| **Resting** | You write the idea in one sentence and rate your desire. Then you forget it for 7 days. |
| **Review** | When the rest is over, you rate your desire again. If it holds, the idea ripens: you answer four essential questions (what problem, for whom; what the harvest looks like; the smallest test; what it replaces). |
| **Growing** | A ripe idea takes one of your 3 growing slots. You can set a harvest date. No free slot, no new project. |
| **Harvested or composted** | Finished by you, handed to someone, or dropped on purpose with what you keep from it. Every stage is dated. |

The rest period and the number of slots (1 to 3) can be changed in the options.

The logo is the cycle itself: four squares, like a field rotation. Three places to grow, one field left to rest.

## Features

- One screen: tabs by stage, filters, the idea next to the list on large screens, a bottom bar on phones.
- A "Next step" bar on every idea, with a timeline of dates and durations.
- A step-back question to challenge each idea.
- French and English interface.
- Obsidian export: one Markdown note per idea, with properties, `[[links]]`, a Dataview dashboard and a note template. Notes edited in Obsidian can be imported back.
- Printable A6 cards with the same questions and dates, for ideas that start on paper.
- Works offline and can be installed on a phone or computer.

## Use it

- **Online:** open the GitHub Pages site of this repository.
- **As a file:** download `index.html` and open it in a browser. Installation and offline mode require the online version.

### Install it as an app

| Device | How |
|---|---|
| Android (Chrome, Edge, Samsung Internet) | **Options → Install Novale**, or the browser menu → *Install app* |
| iPhone, iPad (Safari) | *Share* → *Add to Home Screen* |
| Computer (Chrome, Edge) | **Options → Install Novale**, or the install icon in the address bar |
| Computer (Safari on macOS) | *File* → *Add to Dock* |

Once installed, Novale opens in its own window, works offline and offers a **New idea** shortcut (long press on the icon, or right-click in the dock).

### Publish your own copy

Fork or upload this repository, then in **Settings → Pages** choose *Deploy from a branch*, branch `main`, folder `/ (root)`. The app is served at `https://<account>.github.io/<repository>/`. No build step is needed.

## Your data

- Your ideas are stored in your browser only (`localStorage`). Novale has no server, no account and no analytics, and makes no network requests.
- Each browser keeps its own notebook. To back up or move your ideas, use **Options → To Obsidian**, then import them elsewhere with **From Obsidian**.
- Clearing your browser data deletes your notebook. Export regularly.

## Principles

Novale stays deliberately simple (KISS):

1. One HTML file, no framework, no build step, no backend.
2. The user owns the data, in an open format (Markdown).
3. A new feature replaces another one, or waits.
4. Novale is developed with Novale: every feature idea goes through the rest, the review and the four questions.

## Development

```sh
npm install   # installs jsdom for the tests
npm test      # replays the full cycle in a simulated browser
```

The app is `index.html`. Edit it, open it in a browser, run the tests. That's all.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## AI transparency

Most of Novale's code and texts were written by Claude, an AI by Anthropic, under the direction of the maintainer. No AI runs while you use Novale. Details in [AI-TRANSPARENCY.md](AI-TRANSPARENCY.md).

## License

[MIT](LICENSE). Third-party code: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
