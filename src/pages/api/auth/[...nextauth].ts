import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const data = {
  token: {
    platform: '',
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6Implbm8iLCJlbWFpbCI6InF1eS4xMjA5OTNAZ21haWwuY29tIiwiZXhwIjoxNjg2MDUyMzI1LCJpYXQiOjE2ODYwMzc5MjUsInN1YiI6IjRmNjdjMTQ3LTg3MjYtNDU4NS1iZWNhLWIzNTE1MTUwZmJhMiJ9.muia5iZoAOeSn1If87S0YD4RGoNX76xtQTjCIDYzWfk',
    refresh_token: '29cf8170-5d04-4aea-9c97-2231e3f8338a',
    expired_at: 1686052325,
  },
  user: {
    id: '4f67c147-8726-4585-beca-b3515150fba2',
    name: 'Phan Vinh Quy',
    email: 'quy.120993@gmail.com',
    profile_picture:
      'https://lh3.googleusercontent.com/a/AGNmyxbweqCD03j26dwzWEdLHIWgqWHTh3tINbHDYn5BUw=s96-c',
    phone: null,
    bio: null,
  },
};

export const options = {
  providers: [
    CredentialsProvider({
      id: 'provider-id-1',
      name: 'Login Manually',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        return new Promise<any>((resolve, reject) => {
          setTimeout(() => {
            resolve(data);
          }, 2000);
        });
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user, account, profile }) {
      //USER object is the response returned from the authorize callback
      //PROFILE object is the raw body of the HTTP POST submission.
      //ACCOUNT is the token information returned from the provider.
      //TOKEN is the current JSON Web Token created for the session.

      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },
    session({ session, user, token }) {
      if (token) {
        session.user = token.user as User;
        session.token = token.token as User['token'];
      }

      return session;
    },
  },
} satisfies AuthOptions;

export default NextAuth(options);
