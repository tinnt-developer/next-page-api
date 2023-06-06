import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
    token: User['token'];
  }

  interface User {
    user: {
      id: string;
      name: string;
      email: string;
      profile_picture: string;
      phone: string;
      bio: null;
    };

    token: {
      access_token: string;
      refresh_token: string;
      expired_at: number;
    };
  }
}
