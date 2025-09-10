import { z } from 'zod';

export const MessageTypes = [
  'feedback',
  'question',
  'complaint',
  'other',
] as const;

export type UserMessageType = (typeof MessageTypes)[number];

export const ComplaintTypes = ['billing', 'technical', 'other'] as const;

export type ComplaintType = (typeof ComplaintTypes)[number];

export const ClassifierResponseSchema = z.object({
  messageType: z.enum(MessageTypes).describe('Type of the user message'),
  complaintType: z
    .enum(ComplaintTypes)
    .optional()
    .describe(
      'Type of complaint, if applicable (in case messageType is complaint)'
    ),
});

export type ClassifierResponse = z.infer<typeof ClassifierResponseSchema>;
