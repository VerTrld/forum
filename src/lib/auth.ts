import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session:{strategy:'jwt'},
  providers: [

    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        hash: { label: 'Password', type: 'password' },
      },
    
      authorize: async ({ username, hash }) => {
        try {
          const fetchRequest = await axios.post('http://localhost:3001/auth/login', { username, hash });
    
          // Log the response to check for issues
          console.log('Axios Response:', fetchRequest);
    
          const response = fetchRequest.data;
          if (!response || !response.accessToken) {
            console.error('No access token in response');
            return null;
          }
    
          const { accessToken, user } = response;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      }
    })
    
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        const { accessToken, ...rest } = user;
        token.accessToken = accessToken;
        token.user = rest;
      }
      // eslint-disable-next-line no-console
      return token;
    },
    // jwt: async ({ token, user }) => {

    // },
    async session({ session, token: { accessToken, refreshToken, ...token } }) {
      // @ts-ignore
      session.user = {
        ...session.user,
        // @ts-ignore
        ...token.user,
      };
      // @ts-ignore
      session.accessToken = accessToken;
      // @ts-ignore
      session.refreshToken = refreshToken;
      // @ts-ignore
      session.tokenData = jwtDecode(accessToken);
      // eslint-disable-next-line no-console
      return session;
    },
  },
  
});