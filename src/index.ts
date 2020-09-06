import "./styles/_index.scss";
import YandexDiskApi from "./modules/YandexDiskApi/YandexDiskApi";
import Gallery from "./modules/Gallery/Gallery";
import Loader from './modules/Loader/Loader';

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('root');

  const loader = new Loader(root);
  loader.show();

  /**
   * Получаем данные из yandex disk api
   */
  try {
    const photos = await YandexDiskApi.getPhotos(`v1/disk/public/resources?public_key=https://yadi.sk/d/TlN0aHs33Ag_dA?w=1`);
    const gallery = new Gallery(root);
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
  } catch (e) {
    alert(`Произошла ошибка, перезагрузите страницу: ${e}`);
  }

});
