import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { modelsRegistry } from '../../../common/models.registry';
import { GraphState } from '../cs.graph';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ClassifierResponse, ClassifierResponseSchema } from './schema';
import { logState } from '../../../common/logState';

export const CLASSIFIER_AGENT = 'classifier_agent';

export async function classifierAgent(
  state: GraphState
): Promise<Partial<GraphState>> {
  // logState(state);

  const model = modelsRegistry.gemini
    .get('gemini-2.5-flash', {
      temperature: 0.1,
    })
    .withStructuredOutput<ClassifierResponse>(ClassifierResponseSchema);

  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are a customer service assistant bot.
      Classify the user message into one of the following categories: feedback, question, complaint, or other.
      If the message is a complaint, also classify it into one of the following types: billing, technical, or other.
      `
      // Respond In the following format: {formatInstructions}`,
    ],
    ['human', '{latestMessage}'],
  ]);

  const chain = promptTemplate.pipe(model);

  const latestMessage = state.messages[state.messages.length - 1].text;
  // const formatInstructions = StructuredOutputParser.fromZodSchema(
  //   ClassifierResponseSchema
  // ).getFormatInstructions();

  return await chain.invoke({
    latestMessage,
    // formatInstructions,
  });
}


/*
I abandoned including the format instructions because of many zod issues
like incompatibility of zod versions, and the error: Type instantiation is excessively deep and possibly infinite.ts(2589)

[X] todo 1:
 ensure that without giving format instructions, the model still responds in the correct format
 try to see how .withStructuredOutput works under the hood (if it prompts the model to respond in a structured way)
--> .withStructuredOutput uses function calling for output parsing, and instructs LLM with JSON Schema inferred from zod (zod-to-json-schema)

[X] todo 2:
 in case .withStructuredOutput does not work properly
 try to use json schema with (zod-to-json-schema)
--> .withStructuredOutput already does that

[X] todo 3:
  maybe the zod infinite compilation is with typescript config
--> No, it's probably zod version incompatibility
--> I searched many issues about this, and it seems to be a common problem and there's no clear solution
*/