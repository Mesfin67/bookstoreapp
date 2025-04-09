import { config } from 'dotenv';

config({ path:process.env.NODE_ENV });

export const {
  PORT, NODE_ENV,
  DB_URI,
  JWT_SECRET, JWT_EXPIRES_IN,GMAIL_USER,GMAIL_APP_PASSWORD,FRONTEND_URL
} = process.env;