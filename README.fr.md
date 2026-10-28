# Novale

**Semer, laisser reposer, cultiver ce qui tient.**

### [▶ Ouvrir Novale](https://barthelemyr.github.io/novale/)

Fonctionne dans tout navigateur et s'installe sur ton téléphone ou ton ordinateur.

Novale est un carnet d'idées qui fait reposer les idées avant de les démarrer. Il s'adresse aux personnes qui aiment le neuf et finissent avec trop de projets à moitié commencés.

En latin, *novale* désigne une terre en jachère, mais aussi une terre cultivée pour la première fois : le repos d'abord, puis un vrai départ.

[English version](README.md)

## Le principe

Chaque idée suit le même cycle :

| Étape | Ce qui se passe |
|---|---|
| **En jachère** | Tu notes l'idée en une phrase et ton envie. Puis tu l'oublies pendant 7 jours. |
| **Relecture** | À la fin du repos, tu redonnes ton envie. Si elle tient, l'idée mûrit : tu réponds à quatre questions essentielles (quel problème, pour qui ; à quoi ressemble la récolte ; le plus petit test ; ce que ça remplace). |
| **Cultivée** | Une idée mûre prend une de tes 3 places de culture. Tu peux fixer une date de récolte. Pas de place libre, pas de nouveau projet. |
| **Récoltée ou compostée** | Terminée par toi, transmise à quelqu'un, ou abandonnée en connaissance de cause avec ce que tu en gardes. Chaque étape est datée. |

La durée du repos et le nombre de places (1 à 3) se règlent dans les options.

Le logo, c'est le cycle lui-même : quatre carrés, comme un assolement. Trois places de culture, une parcelle en jachère.

## Fonctionnalités

- Un seul écran : onglets par étape, filtres, la fiche à côté de la liste sur grand écran, une barre en bas sur téléphone.
- Une barre « Prochaine étape » sur chaque idée, avec la chronologie des dates et des durées.
- Une question de recul pour interroger chaque idée.
- Interface en français et en anglais.
- Export Obsidian : une note Markdown par idée, avec ses propriétés, des liens `[[…]]`, un tableau de bord Dataview et un modèle de note. Les notes modifiées dans Obsidian peuvent revenir dans Novale.
- Fiches A6 à imprimer, avec les mêmes questions et les mêmes dates, pour les idées qui naissent sur papier.
- Fonctionne hors ligne et s'installe sur téléphone ou ordinateur.

## L'utiliser

- **En ligne** : [https://barthelemyr.github.io/novale/](https://barthelemyr.github.io/novale/)
- **En fichier** : télécharge `index.html` et ouvre-le dans un navigateur. L'installation et le mode hors ligne demandent la version en ligne.

### L'installer comme une application

| Appareil | Comment |
|---|---|
| Android (Chrome, Edge, Samsung Internet) | **Options → Installer Novale**, ou menu du navigateur → *Installer l'application* |
| iPhone, iPad (Safari) | *Partager* → *Sur l'écran d'accueil* |
| Ordinateur (Chrome, Edge) | **Options → Installer Novale**, ou l'icône d'installation dans la barre d'adresse |
| Ordinateur (Safari sur macOS) | *Fichier* → *Ajouter au Dock* |

Une fois installé, Novale s'ouvre dans sa propre fenêtre, fonctionne hors ligne et propose un raccourci **Nouvelle idée** (appui long sur l'icône, ou clic droit dans le dock).

### Publier ta propre copie

Duplique ou dépose ce dépôt, puis dans **Settings → Pages** choisis *Deploy from a branch*, branche `main`, dossier `/ (root)`. L'application est servie à l'adresse `https://<compte>.github.io/<dépôt>/`. Aucune compilation n'est nécessaire.

## Tes données

- Tes idées restent dans ton navigateur (`localStorage`). Novale n'a ni serveur, ni compte, ni statistiques, et ne fait aucune requête réseau.
- Chaque navigateur a son propre carnet. Pour sauvegarder ou déplacer tes idées, utilise **Options → Vers Obsidian**, puis **Depuis Obsidian** ailleurs.
- Effacer les données du navigateur efface le carnet. Exporte régulièrement.

## Principes

Novale reste volontairement simple (KISS) :

1. Un seul fichier HTML, sans framework, sans compilation, sans serveur.
2. Les données appartiennent à l'utilisateur, dans un format ouvert (Markdown).
3. Une fonctionnalité qui entre en remplace une autre, ou elle attend.
4. Novale se développe avec Novale : chaque idée de fonctionnalité passe par la jachère, la relecture et les quatre questions.

## Développement

```sh
npm install   # installe jsdom pour les tests
npm test      # rejoue le cycle complet dans un navigateur simulé
```

L'application, c'est `index.html`. On le modifie, on l'ouvre dans un navigateur, on lance les tests. C'est tout.

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md).

## Transparence IA

L'essentiel du code et des textes de Novale a été écrit par Claude, une IA d'Anthropic, sous la direction du mainteneur. Aucune IA n'intervient pendant l'utilisation. Détails dans [AI-TRANSPARENCY.md](AI-TRANSPARENCY.md).

## Licence

[MIT](LICENSE). Code tiers : [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
