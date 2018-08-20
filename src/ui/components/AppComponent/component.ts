import Component, { tracked } from '@glimmer/component';

export default class AppComponent extends Component {
  @tracked current = 0;
  speakers = ['Tom', 'Yehuda', 'Ed'];

  @tracked('current')
  get currentlySpeaking() {
    return this.speakers[this.current];
  }

  next() {
    this.current = this.current + 1;
    if (this.current >= this.speakers.length) {
      this.current = 0;
    }
  }
}
