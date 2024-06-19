import React from "react";

interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      <h1>Product Page</h1>
      <p>{slug}</p>
      <p>{sortOrder}</p>
    </div>
  );
};

export default ProductPage;
