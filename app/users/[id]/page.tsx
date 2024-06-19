import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const userDetailPage = ({ params: { id } }: Props) => {
  if (id > 10) {
    notFound();
  }

  return (
    <div>
      <h1>UserDetailpage</h1>
      <p>{id}</p>
    </div>
  );
};

export default userDetailPage;
