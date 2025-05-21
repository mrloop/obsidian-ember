import { App, PluginSettingTab, Setting } from "obsidian";
import EmberPlugin from "../main";

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
      .setName("Local Renderer URL Port for desktop")
      .setDesc("Port of the local Ember renderer")
      .addText((text) =>
        text
          .setPlaceholder("5111")
          .setValue(this.plugin.settings.port)
          .onChange(async (value) => {
            this.plugin.settings.port = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("Remote Renderer URL for mobile")
      .setDesc("Due to restrictions on mobile a remote renderer is used")
      .addText((text) =>
        text
          .setPlaceholder("https://obsidian-ember.mrloop.com")
          .setValue(this.plugin.settings.url)
          .onChange(async (value) => {
            this.plugin.settings.port = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
