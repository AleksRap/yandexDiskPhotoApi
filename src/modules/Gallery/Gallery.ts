import dom from '../../core/Dom/Dom';
import './Galery.scss';
import Events from '../../core/Events/Events';

export default class Gallery extends Events {
  readonly parent: any;
  readonly el: any;

  constructor(parent) {
    super();
    this.parent = parent;
    this.el = this.init();

    this.bind();
  }


  init() {
    const gallery = dom().create('div', ['Gallery']);
    this.parent.append(gallery);

    return gallery;
  }

  addImg(url: string, name: string) {
    const img = dom().create('img');
    img.src = url;

    const text = dom().create('span', ['Gallery__text']);
    text.textContent = name;

    const imgWrap = dom().create('div', ['Gallery__img']);

    imgWrap.append(text);
    imgWrap.append(img);

    this.el.append(imgWrap);

    return imgWrap;
  }

  clear() {
    this.el.innerHTML = '';
  }

  private bind() {
    super.addEvent(document, 'click', (e) => this.toggleNotificationImg(e));
  }

   private toggleNotificationImg(e) {
    const imgWrap = e.target.closest('.Gallery__img');
    this.closeAllNotifications(imgWrap);

    if (!imgWrap) {
      return
    }

    imgWrap.classList.toggle('active');
  }

  private closeAllNotifications(notClearEl) {
    this.el.querySelectorAll('.Gallery__img').forEach(item => {
      item !== notClearEl && item.classList.remove('active');
    });
  }
}
