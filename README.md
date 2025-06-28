# Ember Plugin for Obsidian

This is the monorepo for the Ember plugin for Obsidian and preview app. It previews `gjs` code blocks in [Obsidian](https://obsidian.md).

https://github.com/user-attachments/assets/ee3a1d97-fe3e-4eaa-a4f2-410956ee95bd

## Network Access

The preview app which renders the `gjs` code block runs in an iframe to sandbox the execution of the code. The preview app is bundled as part of the plugin and on Desktop the preview app is served locally by the plugin. Due to restrictions on Mobile devices the preview app is served from a remote server. The default server is https://obsidian-ember.mrloop.com which can be changed in the plugin settings.

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

The preview app is deployed automatically by the CI/CD pipeline to Netlify. 
