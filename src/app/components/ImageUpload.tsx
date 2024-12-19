

import { useState } from "react";
import axios from "axios";

interface ImageUploadProps {
  
  id_: string;
  defaultValue: string | null;
  sendDataToParent: (data: string) => void;
}

export default function ImageUpload({
  
  id_,
  defaultValue=null,
  sendDataToParent,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const cloudinaryConfig = {
    cloud_name: "dslqibzvw", // Replace with your Cloudinary cloud name
    upload_preset: "momo0303", // Replace with your Cloudinary upload preset
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.upload_preset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedImageUrl = response.data.secure_url;
      setImageUrl(uploadedImageUrl); // Save uploaded image URL in state
      sendDataToParent(uploadedImageUrl); // Send image URL to parent component
      setUploadError(null); // Clear any existing errors
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadError("Failed to upload the image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        id={id_}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {imageUrl ? (
        // Display the uploaded image if `imageUrl` exists
        <div className="relative">
          <img
            src={imageUrl}
            alt="Uploaded Image"
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
          <label
            htmlFor={id_}
            className="absolute bottom-1 right-1 bg-white text-gray-700 px-2 py-1 rounded-md cursor-pointer text-xs"
          >
            Change Image
          </label>
        </div>
      ) : (
        // Display the upload button if no image is uploaded yet
        <label
          htmlFor={id_}
          className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg text-gray-500"
        >
          <span>Upload Image</span>
        </label>
      )}

      {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
    </div>
  );
}
