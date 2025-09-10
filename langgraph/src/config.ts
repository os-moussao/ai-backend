import { config as env } from 'dotenv';

env();

export const config = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  LANGSMITH_API_KEY: process.env.LANGSMITH_API_KEY || '',
  LANGSMITH_TRACING: process.env.LANGSMITH_TRACING === 'true',
  LANGSMITH_PROJECT: process.env.LANGSMITH_PROJECT,
  LANGSMITH_ENDPOINT: process.env.LANGSMITH_ENDPOINT,
};
