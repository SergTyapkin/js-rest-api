export default class REST_API {
    constructor(base_path = null) {
        this.base_path = base_path;
    }

    post(path, data = {}) {
        return this.request('POST', path, data);
    }

    put(path, data = {}) {
        return this.request('PUT', path, data);
    }

    delete(path, data = {}) {
        return this.request('DELETE', path, data);
    }

    get(path, data = {}) {
        let query = Object.entries(data).reduce((query, [key, value]) => query + `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}&`, '?');
        query = query.replace(/[?&]$/, '');
        return this.request('GET', path + query);
    }

    async request(method, path, data) {
        const response = await fetch(
          (this.base_path ? this.base_path : '') + path,
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
        } catch {
        }
        return {
            data: parsedObject,
            code: response.code,
            ok: response.ok,
        };
    }
}
