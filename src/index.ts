import "./styles/_index.scss";
import YandexDiskApi, {ParamsSort} from "./modules/YandexDiskApi/YandexDiskApi";
import Gallery from "./modules/Gallery/Gallery";
import Loader from './modules/Loader/Loader';
import Tools from "./modules/Tools/Tools";
import {fromEvent, interval} from "rxjs";
import {throttle} from "rxjs/operators";

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('root');

  /**
   * Получаем данные из yandex disk api
   */
  const loader = new Loader(root);
  const tools = new Tools(root);
  const gallery = new Gallery(root);

  /** Загрузка картинок */
  async function loadImg(photos) {
    loader.show();
    gallery.clear();

    const promisesLoadImg: any[] = [];

    photos.forEach(({file: fileUrl, name}) => {
      promisesLoadImg.push(
        new Promise((res) => {
          gallery
            .addImg(fileUrl, name)
            .querySelector('img')
            .addEventListener('load', () => res(true));
        })
      );
    });

    /** Ждем пока загрузятся все картинки */
    const promises = await Promise.all(promisesLoadImg);
    const imgLoaded = promises.reduce((prev, item): boolean | undefined => item === prev, true);

    imgLoaded && loader.hide();
  }

  try {
    const photos = await YandexDiskApi.getPhotos(`v1/disk/public/resources?public_key=https://yadi.sk/d/TlN0aHs33Ag_dA?w=1`);
    loadImg(photos);
  } catch (err) {
    alert(`Произошла ошибка, перезагрузите страницу: ${err}`);
  }

  /** Биндим события с троттлингом */
  function bindClickWithThrottle(el) {
    fromEvent(el, 'click')
      .pipe(throttle( () => interval(1000)))
      .subscribe(
        async (e: any) => {
          try {
            const photos = await YandexDiskApi.getPhotos(`v1/disk/public/resources?public_key=https://yadi.sk/d/TlN0aHs33Ag_dA?w=1`, {sort: ParamsSort[e.target.dataset.sort]});
            loadImg(photos);
          } catch (err) {
            alert(`Произошла ошибка, перезагрузите страницу. ${err}`);
          }
        });

  }

  /**
   * Изменение сортировки полученных картинок
   * фронтовую сортировку не делаем т.к на сервере картинок больше чем приходит за один запрос
   */
  bindClickWithThrottle(tools.btnSortName);
  bindClickWithThrottle(tools.btnSortSize);
});
