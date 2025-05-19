# Obsidian Ember Plugin

This is the monorepo for the obsidian-ember plugin and preview app. It previews `gjs` code blocks in [Obsidian](https://obsidian.md).

## Releasing

If needed update the minAppVersion in `packages/plugin/manifest.json` to the version of Obsidian you want to support.

Run 

```bash
pnpm version patch
git push origin --tags
```

### Plugin

The plugin is released automatically by the CI/CD pipeline.

### Preview App

The preview app is deployed automatically by the CI/CD pipeline to Netlify. Any changes to the main branch will automatically be deployed by Netlify.
