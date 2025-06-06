import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text" },
        hash: { label: "Password", type: "password" },
      },

      authorize: async ({ email, hash }) => {
        console.log("LOGIN INPUTS:", { email, hash });
        try {
          const fetchRequest = await axios.post(
            `${process.env.AUTH_URL}/auth/login`,
            { email, hash }
          );

          // Log the response to check for issues
          console.log("Axios Response:", fetchRequest);

          const response = fetchRequest.data;
          if (!response || !response.accessToken) {
            console.error("No access token in response");
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
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error: Ignoring type for user-related fields due to mismatched types
        const { accessToken, ...rest } = user;
        token.accessToken = accessToken;
        token.user = rest;
      }
      // eslint-disable-next-line no-console
      return token;
    },
    async session({ session, token: { accessToken, refreshToken, ...token } }) {
      session.user = {
        ...session.user,
        // @ts-expect-error: Assigning dynamic user properties
        ...token.user,
      };
      // @ts-expect-error: Type error due to dynamic token properties
      session.accessToken = accessToken;
      // @ts-expect-error: Type error due to dynamic token properties
      session.refreshToken = refreshToken;
      // @ts-expect-error: Type error when decoding access token for session
      session.tokenData = jwtDecode(accessToken);
      // eslint-disable-next-line no-console
      return session;
    },
  },
});
