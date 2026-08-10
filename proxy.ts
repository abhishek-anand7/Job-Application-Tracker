import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();

  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next();
}

// Acts like a middleware. It's basically a file that you can write a function inside of it and it is going to run before your request reaches any page or API route. Think of it as a security checkpoint or a traffic controller on your website. If you open a new page or you make an API request to a route that you create, it is going to always run first on this proxy function.

// And that means that you can do stuff like redirect user, block access, rewrite URLs, inspect cookies, all that kind of stuff. And because the proxy runs on the server edge, it is extremely fast and it never reaches or ships to the client.