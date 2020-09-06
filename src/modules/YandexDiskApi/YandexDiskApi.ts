import Fetch from "../../core/Fetch/Fetch";

export enum ParamsSort {
  name = 'name',
  size = 'size'
}

interface Params {
  sort?: string
}

export default class YandexDiskApi extends Fetch {
  private static limit: number = 20;
  private static baseUrl: string = 'https://cloud-api.yandex.net/';

  static async getPhotos(url: string, params: Params = {sort: ParamsSort['name']}) {
    const paramsStr = Object.keys(params).map(key => `${key}=${params[key]}`);

    const meta = await super.get(this.baseUrl + url + `&limit=${this.limit}&${paramsStr}`);
    return meta._embedded.items;
  }
}
