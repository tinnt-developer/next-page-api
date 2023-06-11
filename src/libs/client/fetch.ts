import { Fetch } from 'src/libs/fetch';

export class ClientFetch extends Fetch {
  protected BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  withBaseUrl(url: string) {
    return `${this.BASE_URL}/${url}`;
  }

  override async get<T>(url: string, query?: T, config?: RequestInit) {
    const res = await super.get(this.withBaseUrl(url), query, config);

    if (res.ok) {
      return await res.json();
    }

    throw new Error(await res.json());
  }
}
