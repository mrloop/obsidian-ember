# Obsidian Ember Plugin

This is the Ember plugin for Obsidian (https://obsidian.md). It previews `gjs` code blocks in Obsidian.

https://github.com/user-attachments/assets/ee3a1d97-fe3e-4eaa-a4f2-410956ee95bd

## Releasing

See the monorepo [README.md](../../README.md) for instructions on how to release this plugin.

## How to use

- Clone this repo.
- Make sure your NodeJS is at least v22 (`node --version`).
- `pnpm install` to install dependencies.
- `pnpm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-ember/`.

## Symbolic linking plugin for development

- `ln -s $(pwd) VaultFolder/.obsidian/plugins/obsidian-ember`

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`
