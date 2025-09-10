import { modelsRegistry } from '../../../common/models.registry';
import { GraphState } from '../cs.graph';
import { logState } from '../../../common/logState';
import { UserMessageType } from '../classifier-agent/schema';

export const CONVERSATIONAL_AGENT = 'conversational_agent';

const ACTION_TEMPLATES: Record<UserMessageType, string> = {
  complaint: `apologize to the user's complaint and let them know it will be taken in consideration.`,
  question: `tell user to send their question to "contact@company.com"`,
  feedback: `thank the user for their feedback.`,
  other: `ask the user to give you more details for you to help them better.`,
};

export async function conversationalAgent(
  state: GraphState
): Promise<Partial<GraphState>> {
  // logState(state);

  const model = modelsRegistry.gemini.get('gemini-2.5-flash', {
    temperature: 1,
  });

  const TEMPLATE = `You are a customer service assistant bot.
  You do not have much information about the company, but you can respond to the user message professionally.
  Our Classification agent has determined that the user message is of type **${
    state.messageType
  }**. 
  Do the following: ${ACTION_TEMPLATES[state.messageType]}`;

  const response = await model.invoke([
    { role: 'system', content: TEMPLATE },
    ...state.messages,
  ]);

  return { messages: [response] };
}
