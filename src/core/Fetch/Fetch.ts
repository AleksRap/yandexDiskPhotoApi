interface Headers {
  [key: string]: string
}

export default class Fetch {
  static headers: Headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  static async get(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const json = await response.json();

    this.checkError(json);

    return json;
  }

  private static checkError(json): void {
    if ('error' in json) throw new Error(json.message);
  }
}
