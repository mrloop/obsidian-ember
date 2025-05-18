# Obsidian Ember Plugin

[![Netlify Status](https://api.netlify.com/api/v1/badges/e85256f4-f552-41d1-abd8-c745ef74c3fc/deploy-status)](https://app.netlify.com/projects/obsidian-ember/deploys)
This is the monorepo for the obsidian-ember plugin and preview app. It previews `gjs` code blocks in [Obsidian](https://obsidian.md).

## Releasing

If needed update the minAppVersion in `packages/plugin/manifest.json` to the version of Obsidian you want to support.
Run `pnpm version patch`

### Plugin

The plugin is released automatically by the CI/CD pipeline.

### Preview App

The preview app is deployed automatically by Netlify from the main branch. Any changes to the main branch will automatically be deployed by Netlify.
