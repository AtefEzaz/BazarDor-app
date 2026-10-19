// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   baseURL: process.env.BETTER_AUTH_URL,
// });

// export const { signIn, signUp, useSession } = createAuthClient();
import { createAuthClient } from "better-auth/react";

// No baseURL needed: it automatically uses the current site (localhost / Vercel)
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
