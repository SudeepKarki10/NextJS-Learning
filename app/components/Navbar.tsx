import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 mb-8 text-xl font-bold">
      <h1>Next.js</h1>
      <Link href="/users/new"> User</Link>
    </div>
  );
};

export default Navbar;
