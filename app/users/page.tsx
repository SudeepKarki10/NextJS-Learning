import React, { Suspense } from "react";
import Link from "next/link";
import UserTable from "./UserTable";
import Loading from "../loading";
import Navbar from "../components/Navbar";
import { notFound } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  searchParams: { sortOrder: string };
}

interface NumArray {
  array: Number[];
}
const UserPage = async ({ searchParams: { sortOrder } }: Props) => {
  const arr: NumArray = {
    array: [1, 2, 3, 4],
  };

  return (
    <>
      <Navbar />
      {/* for logging error page
      {arr.map((x) => console.log(x))} */}
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UserPage;
