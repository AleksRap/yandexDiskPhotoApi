import dom from '../../core/Dom/Dom';
import './Loader.scss'

export default class Loader {
  private parent: any;
  private el: any;
  private body: any;


  constructor(parent) {
    this.parent = parent;
    this.el = this.init();

    this.body = document.querySelector('body');
  }

  init() {
    const loader = dom().create('div', ['Loader', 'active']);
    loader.append(dom().create('div'));
    this.parent.append(loader);

    return loader;
  }

  show(): void {
    this.el.classList.add('active');
    this.body.style.overflow = 'hidden';
  }

  hide(): void {
    this.el.classList.remove('active');
    this.body.style.overflow = 'initial';
  }
}
