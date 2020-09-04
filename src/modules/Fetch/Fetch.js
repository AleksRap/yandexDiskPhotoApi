export default class Fetch {
  static headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  static async get(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const json = await response.json();

    this._checkError(json);

    return json;
  }

  static async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    const json = await response.json();

    this._checkError(json);

    return json;
  }

  static async put(url, body) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    const json = await response.json();

    this._checkError(json);

    return json;
  }

  static async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    });
    const json = await response.json();

    this._checkError(json);

    return json;
  }

  static _checkError(json) {
    if ('error' in json) throw new Error(json.message);
  }
}
