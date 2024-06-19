"use client";

import { useRouter, notFound } from "next/navigation";
import React from "react";

const NewUserPage = () => {
  const router = useRouter();
  //in this way we can show the different error page if any particular errors occurs using logic
  // const checkError = "true";
  // if (checkError) {
  //   notFound();
  // }

  return (
    <div>
      <button className="btn btn-primary" onClick={() => router.push("/users")}>
        Create User
      </button>
    </div>
  );
};

export default NewUserPage;
