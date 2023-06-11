import { createHandler, Get, Query } from 'next-api-decorators';

import { Auth, AuthGuard } from 'src/libs/server/decorators';

@AuthGuard()
class EventRoute {
  private endpoint = 'events';

  @Get()
  async listEvents(@Auth() auth, @Query() query: any) {
    // TODO: try catch
    const res = await fetch(`${process.env.API_URL}/${this.endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });

    return await res.json();
  }
}

export default createHandler(EventRoute);
