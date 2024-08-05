import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.development.env' });

export const {
  DB_TYPE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET,
  PORT,
} = process.env;
