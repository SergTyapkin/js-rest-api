export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'TRACE' | 'PATCH' | string;

export default class REST_API {
  basePath: string

  constructor(basePath: string = "") {
    this.basePath = basePath;
  }

  post(path: string, data: object = {}) {
    return this.request('POST', path, data);
  }

  put(path: string, data: object = {}) {
    return this.request('PUT', path, data);
  }

  delete(path: string, data: object = {}) {
    return this.request('DELETE', path, data);
  }

  get(path: string, data: object = {}) {
    let query = Object.entries(data).reduce((query, [key, value]) => query + `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}&`, '?');
    query = query.replace(/[?&]$/, '');
    return this.request('GET', path + query);
  }

  /**
   * Sends a data to url specified by basePath of this object and given path
   * @param method Method of request
   * @param path Path to send a request
   * @param data A value, usually an object or array, to be converted to JavaScript Object Notation (JSON) string
   */
  async request(method: Methods, path: string, data?: object): Promise<{ data: object, status: number, ok: boolean }> {
    const response = await fetch(
      this.basePath + path,
      {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      }
    );
    let parsedObject = {};
    try {
      parsedObject = JSON.parse(await response.text()) || {};
    } catch (err) {
      throw TypeError(`Gotten not JSON-parsable response body from server. Server must response with only objects (not arrays or strings) in JSON format.\nError from 'JSON.parse' method: ${err}`);
    }
    return {
      data: parsedObject,
      status: response.status,
      ok: response.ok,
    };
  }
}
