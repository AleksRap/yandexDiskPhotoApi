export default class Events {
  events = [];

  /**
   * На входе принимаем объект с параметрами
   * el    - элемент, на который навешиваем обработчик
   * event - событие (str)
   * fn    - функция без вызова
   */
  addEvent(el, event, fn) {
    this.events.push(el, event, fn);

    /** Вешаем слушатель */
    el.addEventListener(event, fn);

    return true;
  }

  removeEvents() {
    /** Снимаем обработчики события */
    this.events.forEach(item => {
      item.el.removeEventListener(item.event, item.fn)
    });

    /** Очищаем массив */
    this.events = [];

    return true;
  }
}
