import { modelsRegistry } from '../../../common/models.registry';
import { GraphState } from '../cs.graph';
import { ClassifierResponse, ClassifierResponseSchema } from './schema';
import { SystemMessage } from '@langchain/core/messages';

export const CLASSIFIER_AGENT = 'classifier_agent';

export async function classifierAgent(
  state: GraphState
): Promise<Partial<GraphState>> {
  const model = modelsRegistry.gemini
    .get('gemini-2.5-flash', {
      temperature: 0.1,
    })
    .withStructuredOutput<ClassifierResponse>(ClassifierResponseSchema);

  const MESSAGES = [
    new SystemMessage(`You are a customer service assistant bot.
      Classify the user message into one of the following categories: feedback, question, complaint, or other.
      If the message is a complaint, also classify it into one of the following types: billing, technical, or other.
      `),
    state.messages.at(-1)!,
  ];

  return await model.invoke(MESSAGES);
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
