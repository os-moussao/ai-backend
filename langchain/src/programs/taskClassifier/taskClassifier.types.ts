import { z } from 'zod';

export const TaskClassifierResponseSchema = z.object({
  prompt: z.string().describe('the human prompt'),
  taskType: z
    .enum(['image_generation', 'text_generation'])
    .describe('the appropriate task type'),
});

export type TaskClassifierResponse = z.infer<
  typeof TaskClassifierResponseSchema
>;
