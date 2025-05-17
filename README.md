# Obsidian Ember Plugin

[![Netlify Status](https://api.netlify.com/api/v1/badges/e85256f4-f552-41d1-abd8-c745ef74c3fc/deploy-status)](https://app.netlify.com/projects/obsidian-ember/deploys)
This is the monorepo for the obsidian-ember plugin and preview app. It previews `gjs` code blocks in [Obsidian](https://obsidian.md).

## Releasing

### Plugin

The plugin is released automatically by the CI/CD pipeline.

```bash
pnpm --filter plugin build
pnpm --filter plugin version patch|minor|major
git tag -a 1.0.1 -m "1.0.1"
```

### Preview App

The preview app is deployed automatically by Netlify from the main branch. Any changes to the main branch will automatically be deployed by Netlify.
