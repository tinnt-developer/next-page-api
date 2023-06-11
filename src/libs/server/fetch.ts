import { NextApiRequest } from 'next';

import { Fetch } from 'src/libs/fetch';

export class ServerFetch extends Fetch {
  protected BASE_URL = process.env.API_URL || 'http://localhost:3000';

  withBaseUrl(url: string) {
    return `${this.BASE_URL}/${url}`;
  }

  configIsNextApiRequest(
    config: RequestInit | NextApiRequest,
  ): config is NextApiRequest {
    return 'cookies' in config;
  }

  withToken(config: RequestInit | NextApiRequest) {
    if (this.configIsNextApiRequest(config)) {
      return {
        headers: {
          Authorization: config?.headers?.authorization,
        },
      } as RequestInit;
    }

    return config;
  }

  get<T>(url: string, data?: T, config: RequestInit | NextApiRequest = {}) {
    return super.get(this.withBaseUrl(url), data, this.withToken(config));
  }

  post<T>(url: string, data?: T, config: RequestInit | NextApiRequest = {}) {
    return super.post(this.withBaseUrl(url), data, this.withToken(config));
  }

  put(url: string, data?: any, config: RequestInit | NextApiRequest = {}) {
    return super.put(this.withBaseUrl(url), data, this.withToken(config));
  }

  delete(url: string, data?: any, config: RequestInit | NextApiRequest = {}) {
    return super.delete(this.withBaseUrl(url), data, this.withToken(config));
  }
}
