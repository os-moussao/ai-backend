import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { config } from '../config';

export const models = {
  'gemini-2.5-flash': new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: 'gemini-2.5-flash',
  }),
};
