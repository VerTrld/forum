"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }: PropsWithChildren) => (
  <SessionProvider>{children}</SessionProvider>
);

export default NextAuthProvider;
