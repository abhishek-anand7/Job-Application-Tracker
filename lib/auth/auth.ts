import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});
// `auth` Constant — Purpose

// The `auth` constant is used for all authentication-related operations in the project, such as:

// Sign up — create a new user
// Sign in — authenticate an existing user
// Log out — end the user's session
// Session/User management — handle authenticated user information

// > In short `auth` is the central handler for authentication in the project.


// getSession is a helper function. This is from better-auth documentation.
export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return result;
}

// signOut is a helper function.
export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
