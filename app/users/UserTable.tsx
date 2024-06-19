import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string | number;
}

const userTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    //If data is frequently changing then set cache: "no-store", it means that the data is fetched fresh each time
    //To keep data fresh for certain amount of time set
    //Data caching is possible in the fetch() only and is not available in the third party fetch package like axios
    // cache: "time",
  });
  const users: User[] = await res.json();
  const sortedUsers = sort(users).asc(
    sortOrder === "email"
      ? (user) => user.email
      : sortOrder === "name"
      ? (user) => user.name
      : (user) => user.id
  );

  return (
    <>
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>
              <Link href="/users?sortOrder=id">ID</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=email">Email</Link>
            </th>
            <th></th>
          </tr>
        </thead>
        {sortedUsers.map((user) => (
          <>
            <tbody>
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link href={`/users/${user.id}`}>
                    <button className="bg-orange-600">UserData</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
    </>
  );
};

export default userTable;
