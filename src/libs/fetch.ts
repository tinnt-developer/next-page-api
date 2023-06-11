import qs from 'query-string';

export class Fetch {
  withQuery<T>(url: string, query?: T) {
    if (!query) {
      return url;
    }

    return `${url}?${qs.stringify(query)}`;
  }

  get<T>(url: string, data?: T, config?: RequestInit) {
    return doFetch('GET')(this.withQuery(url, data), {}, config);
  }

  post<T>(url: string, data?: T, config?: RequestInit) {
    return doFetch('POST')(url, data, config);
  }

  put<T>(url: string, data?: T, config?: RequestInit) {
    return doFetch('PUT')(url, data, config);
  }

  delete<T>(url: string, data?: T, config?: RequestInit) {
    return doFetch('DELETE')(url, data, config);
  }

  patch<T>(url: string, data?: T, config?: RequestInit) {
    return doFetch('PATCH')(url, data, config);
  }
}

export const doFetch =
  (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') =>
  (url: string, data: any = {}, override: any = {}) => {
    const defaultConfig = {
      method,
      body: method === 'GET' ? undefined : JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json,text/plain',
      },
    };

    const config = {
      ...defaultConfig,
      ...override,
      headers: new Headers({
        ...defaultConfig.headers,
        ...override.headers,
      }),
    };

    return fetch(url, config);
  };

// Handle options
// Handle headers
// Handle body
// Handle query params
// Handle response
