import { loadPrism, Plugin } from "obsidian";
import { EmberPluginSettingTab } from "settings";

declare global {
  const __IS_PRODUCTION__: boolean;
}

interface EmberPluginSettings {
  renderUrl: string;
}

const DEFAULT_SETTINGS: Partial<EmberPluginSettings> = {
  renderUrl: __IS_PRODUCTION__
    ? "https://obsidian-ember.netlify.app"
    : "http://localhost:4200",
};

export default class EmberPlugin extends Plugin {
  settings: EmberPluginSettings;

  async onload() {
    this.registerExtensions(["gts", "gjs"], "javascript");

    await this.loadSettings();
    this.addSettingTab(new EmberPluginSettingTab(this.app, this));

    this.registerEmberProcessor();
  }

  async registerEmberProcessor() {
    let url = new URL(this.settings.renderUrl);

    ["gjs", "gts"].forEach((lang) => {
      this.registerMarkdownCodeBlockProcessor(
        lang,
        async (source, el, _ctx) => {
          const highlightElement = async (el: HTMLElement) => {
            const prism = await loadPrism();
            prism.highlightElement(el);
          };
          let pre = el.createEl("pre");
          let code = pre.createEl("code", { cls: "language-js", text: source });
          highlightElement(code);

          url.searchParams.set("source", source);
          url.searchParams.set("lang", lang);
          const iframe = el.createEl("iframe");
          iframe.src = url.toString();
          iframe.width = "100%";
          el.appendChild(iframe);
        },
      );
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
