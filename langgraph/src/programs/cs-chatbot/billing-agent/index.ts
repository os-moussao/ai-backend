import { AIMessage } from '@langchain/core/messages';
import { GraphState } from '../cs.graph';

export const BILLING_AGENT = 'billing_agent';

export async function billingAgent(
  state: GraphState
): Promise<Partial<GraphState>> {
  const message = `Please contact our billing department at billing@example.com for assistance with your billing issue.`;
  return { messages: [new AIMessage(message)] };
}
