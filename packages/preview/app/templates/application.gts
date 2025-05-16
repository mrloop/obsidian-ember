import Component from '@glimmer/component';
import { Compiled } from 'ember-repl';
import { use } from 'ember-resources';
import { keepLatest } from 'reactiveweb/keep-latest';
import { service } from '@ember/service';

export default class Application extends Component {
  @use compile = Compiled(() => this.source, this.lang);

  @use latest = keepLatest({
    value: () => this.compile.component,
    when: () => this.compile.error,
  });

  @service router;

  get url() {
    return new URL(this.router.currentURL, 'https://example.com');
  }

  get lang() {
    return this.url.searchParams.get('lang');
  }

  get source() {
    return this.url.searchParams.get('source');
  }

  <template>
    {{#if this.compile.error}}
      Error!
      {{this.compile.error}}
    {{/if}}

    {{#if this.latest}}
      <this.latest />
    {{/if}}
  </template>
}
