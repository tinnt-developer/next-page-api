import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User['data']['user'];
    token: User['data']['token'];
  }

  interface User {
    status: 'success' | 'error';
    message: string;
    data: {
      user: {
        id: string;
        name: string;
        email: string;
        profile_picture: string;
        phone: string;
        bio: null;
        roles: {
          id: string;
          name: string;
        }[];
      };

      token: {
        access_token: string;
        refresh_token: string;
        expired_at: number;
      };
    };
  }
}
