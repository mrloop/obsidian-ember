import { loadPrism, Plugin, Platform } from "obsidian";
import { EmberPluginSettingTab } from "./src/settings";
import { LocalHttpServer } from "./src/server";

interface EmberPluginSettings {
  url: string;
  port: string;
}

const DEFAULT_SETTINGS: Partial<EmberPluginSettings> = {
  url: "https://obsidian-ember.mrloop.com",
  port: "5111",
};

export default class EmberPlugin extends Plugin {
  settings: EmberPluginSettings;

  private localServer: LocalHttpServer | null = null;

  async onload() {
    this.registerExtensions(["gts", "gjs"], "javascript");

    await this.loadSettings();
    this.addSettingTab(new EmberPluginSettingTab(this.app, this));

    this.registerEmberProcessor();

    if (!Platform.isMobile) {
      this.localServer = new LocalHttpServer(this.settings.port, (str) => {
        const filePath = [this.manifest.dir ?? "", "dist", str].join("/");
        return this.app.vault.adapter.readBinary(filePath);
      });
    }
    await this.localServer?.start();
  }

  async onunload() {
    await this.localServer?.stop();
  }

  async registerEmberProcessor() {
    let url = new URL("http://localhost:" + this.settings.port);
    if (Platform.isMobile) {
      url = new URL(this.settings.url);
    }

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
