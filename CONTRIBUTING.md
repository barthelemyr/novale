# Contributing to Novale

Thank you for your interest. Novale stays small on purpose, so please read this first.

## The rules

1. **Keep it simple.** One HTML file, plain JavaScript, no framework, no build step, no backend, no account.
2. **No network requests.** Novale must keep working offline and never send user data anywhere.
3. **Data stays open.** Anything stored must be exportable to Markdown.
4. **One in, one out.** A new feature should replace an existing one or remove complexity. Otherwise, open an issue first and let it rest.
5. **Both languages.** Every interface text exists in French and English (`I18N` in `index.html`).
6. **Accessible and responsive.** Touch targets of at least 44 px on touch screens, visible keyboard focus, no horizontal scrolling down to 360 px.

## Before you open a pull request

```sh
npm install
npm test
```

Open `index.html` in a browser and try the change on a phone-sized window too.

## Ideas and issues

Describe the problem before the solution. Novale asks the same four questions as the app: what problem, for whom; what "done" looks like; the smallest test; what it replaces.

## AI-assisted contributions

Welcome, if declared:

- add a trailer to your commits, for example `Assisted-by: Claude (Anthropic)`;
- say in the pull request what the AI produced and what you checked yourself.

See [AI-TRANSPARENCY.md](AI-TRANSPARENCY.md).

## License

By contributing, you agree that your contribution is released under the [MIT License](LICENSE).
