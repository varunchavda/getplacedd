import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"; //dotenv loads environment variables from a .env file into process.env.
dotenv.config(); //This line tells dotenv to actually load the variables from the .env file.



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export default cloudinary;
