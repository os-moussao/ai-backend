import { modelsRegistry } from '../../../common/models.registry';
import { GraphState } from '../cs.graph';
import { logState } from '../../../common/logState';

export const CONVERSATIONAL_AGENT = 'conversational_agent';

export async function conversationalAgent(
  state: GraphState
): Promise<Partial<GraphState>> {
  // logState(state);

  const model = modelsRegistry.gemini.get('gemini-2.5-flash', {
    temperature: 1,
  });

  const TEMPLATE = ` You are a customer service assistant bot.
      Our Classification agent has determined that the user message is of type **${state.messageType}**.
      You do not have much information about the company, but you can respond to the user message professionally.
      Based on the message type, respond appropriately:   
      If the user message is a complaint, apologize and let them know it will be taken in consideration.
      If the user message is a question, tell user to send their question to "contact@company.com".
      If the user message is feedback, thank the user for their feedback.
      If the user message is of type "other", ask the user to give you more details for you to help them better.`;

  const response = await model.invoke([
    { role: 'system', content: TEMPLATE },
    ...state.messages,
  ]);

  return { messages: [response] };
}
