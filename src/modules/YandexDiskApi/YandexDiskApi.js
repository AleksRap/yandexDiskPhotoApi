import Fetch from "@modules/Fetch/Fetch";

export default class YandexDiskApi extends Fetch {
  static limit = 10;
  static baseUrl = 'https://cloud-api.yandex.net/';

  static get(url) {
    return super.get(this.baseUrl + url + `&limit=${this.limit}`);
  }
}
