export default class Events {
  events: any[] = [];

  /**
   * На входе принимаем объект с параметрами
   * el    - элемент, на который навешиваем обработчик
   * event - событие (str)
   * fn    - функция без вызова
   */
  addEvent(el, event: string, fn): boolean {
    this.events.push({el, event, fn});

    /** Вешаем слушатель */
    el.addEventListener(event, fn);

    return true;
  }

  removeEvents(): boolean {
    /** Снимаем обработчики события */
    this.events.forEach(item => {
      item.el.removeEventListener(item.event, item.fn)
    });

    /** Очищаем массив */
    this.events = [];

    return true;
  }
}
