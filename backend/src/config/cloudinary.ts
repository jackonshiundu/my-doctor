import { v2 as cloudinary } from "cloudinary";

const createCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_Key,
    api_secret: process.env.CLOUDINARY_APi_Secret,
  });
};

export default createCloudinary;
