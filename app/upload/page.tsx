"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface CloudinaryResult {
  publicId: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <div>
      <CldUploadWidget
        uploadPreset="kmdnlwcs"
        onUpload={(error, result, widget) => {
          setResource(result?.info); // { public_id, secure_url, etc }
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} className="btn btn-primary">
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadPage;
