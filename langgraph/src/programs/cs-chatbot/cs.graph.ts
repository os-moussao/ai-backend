import { BaseMessage } from '@langchain/core/messages';
import {
  Annotation,
  MemorySaver,
  MessagesAnnotation,
  StateGraph,
} from '@langchain/langgraph';
import { ComplaintTypes, MessageTypes } from './classifier-agent/schema';
import { CLASSIFIER_AGENT, classifierAgent } from './classifier-agent';
import {
  CONVERSATIONAL_AGENT,
  conversationalAgent,
} from './conversational-agent';
import { END_NODE, START_NODE } from '../../common/constants';
import { BILLING_AGENT, billingAgent } from './billing-agent';

export const GraphStateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  nextAgent: Annotation<string>,
  refundAuthorized: Annotation<boolean>,
  messageType: Annotation<(typeof MessageTypes)[number]>,
  complaintType: Annotation<(typeof ComplaintTypes)[number]>,
  finalResponse: Annotation<string>({ reducer: (_, b) => b }),
});

export type GraphState = typeof GraphStateAnnotation.State;

const builder = new StateGraph(GraphStateAnnotation)
  .addNode(CLASSIFIER_AGENT, classifierAgent)
  .addNode(CONVERSATIONAL_AGENT, conversationalAgent)
  .addNode(BILLING_AGENT, billingAgent)
  .addEdge(START_NODE, CLASSIFIER_AGENT)
  .addConditionalEdges(CLASSIFIER_AGENT, (state: GraphState) => {
    if (
      state.messageType === 'complaint' &&
      state.complaintType === 'billing'
    ) {
      return BILLING_AGENT;
    }
    return CONVERSATIONAL_AGENT;
  })
  .addEdge(CONVERSATIONAL_AGENT, END_NODE)
  .addEdge(BILLING_AGENT, END_NODE);

export const graph = builder.compile({ checkpointer: new MemorySaver() });
