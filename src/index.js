import "./styles/_index.scss";
import YandexDiskApi from "@modules/YandexDiskApi/YandexDiskApi.js";
import Gallery from "@modules/Gallery/Gallery.js";

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('root');

  /**
   * Получаем данные из yandex disk api
   */
  const meta = await YandexDiskApi.get(`v1/disk/public/resources?public_key=https://yadi.sk/d/TlN0aHs33Ag_dA?w=1`);
  const gallery = new Gallery(root);

  meta._embedded.items.forEach(({file: fileUrl, name}) => {
    gallery.addImg(fileUrl, name);
  });
});
