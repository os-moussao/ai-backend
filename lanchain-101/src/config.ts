import { config as env } from 'dotenv';

env();

export const config = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
};
