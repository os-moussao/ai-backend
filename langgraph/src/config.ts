import { config as env } from 'dotenv';

env();

export const config = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  LANGCHAIN_API_KEY: process.env.LANGCHAIN_API_KEY || '',
  LANGCHAIN_TRACING_V2: process.env.LANGCHAIN_TRACING_V2 === 'true',
  LANGCHAIN_PROJECT_NAME: process.env.LANGCHAIN_PROJECT_NAME || 'default_project',
};
