"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex flex-row gap-4 mb-8 text-xl font-bold space-x-3">
      <h1>Next.js</h1>
      <Link href="/users/new"> User</Link>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link
            href="api/auth/signout"
            className="ml-4 text-blue-700 font-bold"
          >
            Sign out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        //api/auth/signin is the endpoint provided by the next-auth
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
