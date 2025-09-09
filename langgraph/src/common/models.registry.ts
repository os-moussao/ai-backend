import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIChatInput,
} from '@langchain/google-genai';
import { config } from '../config';

const GEMINI_MODELS = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash-preview-image-generation',
  'imagen-4.0-generate-preview-06-06',
] as const;

export const modelsRegistry = {
  gemini: {
    availableModels: GEMINI_MODELS,
    get(
      model: (typeof GEMINI_MODELS)[number],
      options: Omit<GoogleGenerativeAIChatInput, 'apiKey' | 'model'> = {}
    ) {
      return new ChatGoogleGenerativeAI({
        apiKey: config.GEMINI_API_KEY,
        model,
        ...options,
      });
    },
  },
};
