import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME?.trim(),
  api_key: process.env.CLOUD_API_KEY?.trim(),
  api_secret: process.env.CLOUD_API_SECRET?.trim(),
  secure: true,
});

export async function uploadToCloudinary(
  fileBufferOrBase64: string,
  folder: string = "sosync/portfolio"
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileBufferOrBase64,
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
  });
}

export default cloudinary;
