import dom from '@core/Dom/Dom.js';
import './Galery.scss';
import Events from '@core/Events/Evets';

export default class Gallery extends Events {

  constructor(parent) {
    super();
    this.parent = parent;
    this.el = this.init();

    this._bind();
  }


  init() {
    const gallery = dom().create('div', ['Gallery']);
    this.parent.append(gallery);

    return gallery;
  }

  addImg(url, name) {
    const img = dom().create('img');
    img.src = url;

    const text = dom().create('span', ['Gallery__text']);
    text.textContent = name;

    const imgWrap = dom().create('div', ['Gallery__img']);

    imgWrap.append(text);
    imgWrap.append(img);

    this.el.append(imgWrap);
  }

  _bind() {
    super.addEvent(document, 'click', (e) => this._toggleNotificationImg(e));
  }

  _toggleNotificationImg(e) {
    const imgWrap = e.target.closest('.Gallery__img');
    this._closeAllNotifications(imgWrap);

    if (!imgWrap) {
      return
    };

    imgWrap.classList.toggle('active');
  }

  _closeAllNotifications(notClearEl) {
    this.el.querySelectorAll('.Gallery__img').forEach(item => {
      item !== notClearEl && item.classList.remove('active');
    });
  }
}
