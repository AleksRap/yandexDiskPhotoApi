import Fetch from "../../core/Fetch/Fetch";

export default class YandexDiskApi extends Fetch {
  private static limit: number = 20;
  private static baseUrl: string = 'https://cloud-api.yandex.net/';

  static async getPhotos(url: string) {
    const meta = await super.get(this.baseUrl + url + `&limit=${this.limit}`);
    return meta._embedded.items;
  }
}
