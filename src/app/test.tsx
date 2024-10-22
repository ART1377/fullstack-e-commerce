"use client";

import { useState } from "react";
import * as actions from "@/app/actions/auth-actions";

export default function SignUp() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Function to handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(files); // Convert FileList to an array

      // Generate previews for each selected image
      const previewUrls: string[] = [];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            previewUrls.push(reader.result as string);
            // After all previews are loaded, update the state
            if (previewUrls.length === fileArray.length) {
              setImagePreviews(previewUrls);
            }
          }
        };
        reader.readAsDataURL(file); // Convert file to data URL for preview
      });
    }
  };

  return (
    <form action={actions.handleSignUp} className="space-y-6">
      <input type="text" name="firstName" placeholder="First Name" required />
      <input type="text" name="lastName" placeholder="Last Name" required />

      {/* Input for multiple images */}
      <input
        type="file"
        name="images"
        accept="image/*"
        required
        multiple
        onChange={handleFileChange} // Call this when images are selected
      />

      {/* Display image previews */}
      {imagePreviews.length > 0 && (
        <div className="space-y-4">
          {imagePreviews.map((previewUrl, index) => (
            <img
              key={index}
              src={previewUrl}
              alt={`Preview ${index + 1}`}
              className="h-32 w-32 object-cover"
            />
          ))}
        </div>
      )}

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
}
