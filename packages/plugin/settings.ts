import { App, PluginSettingTab, Setting } from 'obsidian';
import EmberPlugin from './main';

export class EmberPluginSettingTab extends PluginSettingTab {
  plugin: EmberPlugin;

  constructor(app: App, plugin: EmberPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Renderer URL')
      .setDesc('Default date format')
      .addText((text) =>
        text
          .setPlaceholder('http://localhost:4200')
          .setValue(this.plugin.settings.renderUrl)
          .onChange(async (value) => {
            this.plugin.settings.renderUrl = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
