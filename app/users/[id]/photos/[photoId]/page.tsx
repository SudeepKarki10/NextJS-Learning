import React from "react";

interface Props {
  params: {
    id: number;
    photoId: number;
  };
}

const userDetailPage = ({ params }: Props) => {
  return (
    <div>
      <h1>UserDetailpage</h1>
      <p>user id: {params.id}</p>
      <p>photo id: {params.photoId}</p>
    </div>
  );
};

export default userDetailPage;
