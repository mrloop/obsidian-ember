import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { loadPrism } from 'obsidian';

export default class EmberPlugin extends Plugin {

	async onload() {
    this.registerExtensions(['gts', 'gjs'], "javascript");
    // due to ember using <script type="module"/> can't server file from file system
    // e.g. let src = this.app.vault.adapter.getResourcePath('dist/index.html');
    let url = new URL('http://localhost:4200');
      //or load from service worker
    ["gjs","gts"].forEach(lang => {
      this.registerMarkdownCodeBlockProcessor(lang, async (source, el, ctx) => {
        const highlightElement = async (el: HTMLElement) => {
          const prism = await loadPrism();
          prism.highlightElement(el);
        };

        let pre = el.createEl('pre');
        let code = pre.createEl('code', {cls: 'language-js', text: source});
        highlightElement(code)

        url.searchParams.set('source', source);
        url.searchParams.set('lang', lang);
        //return "<iframe src='https://mrloop.com'></iframe>";
        const iframe = el.createEl('iframe');
        iframe.src = url.toString();
        iframe.width = '100%';
        el.appendChild(iframe);
      });
    })
  }

	onunload() {}
}
