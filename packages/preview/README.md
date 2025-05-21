# preview

This is an Ember application used in the obsidian ember plugin to preview `gjs` code blocks in Obsidian.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd preview`
- `pnpm install`

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200?lang=gjs&source=%3Ctemplate%3Emy%20template%3C%2Ftemplate%3E).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).


### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `pnpm test`
- `pnpm test:ember --server`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `pnpm ember build` (development)
- `pnpm build` (production)

### Deploying

See the monorepo [README.md](../../README.md) for instructions on how to release this plugin.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
