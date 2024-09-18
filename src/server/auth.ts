import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { accounts, sessions, users } from "~/server/db/schema";

const WHITE_LISTED_ROUTES: string[] = ["/login", "/register", "/"];

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: "dan" | "hailey";
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    sessionsTable: sessions,
    accountsTable: accounts,
  }) as Adapter,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        isDan: { label: "isDan", type: "hidden" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        let name;
        try {
          name = JSON.parse(credentials.isDan) ? "dan" : "hailey";
        } catch (_) {
          name = "hailey";
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const user = (
          await db.select().from(users).where(eq(users.name, name)).limit(1)
        )[0];

        if (!user) {
          // make a new user
          const newUsers = await db
            .insert(users)
            .values({
              name,
              password: hashedPassword,
              email: "",
            })
            .returning({ id: users.id, name: users.name });
          const newUser = newUsers[0];
          console.log("made a user!", newUser);
          if (!newUser) {
            return null;
          }

          return { id: newUser.id, name: newUser.name };
        }

        // if there is an exsiting user, then compare the password
        if (bcrypt.compareSync(credentials.password, user.password)) {
          console.log("passwords matched", { id: user.id, name: user.name });
          return { id: user.id, name: user.name };
        } else {
          console.log("passwords did not match");
          return null;
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
