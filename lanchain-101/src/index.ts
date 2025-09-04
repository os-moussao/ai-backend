import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { config } from './config';
import { PromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts';
import readline from 'readline';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

main();
async function main() {
  const model = new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: 'gemini-2.5-flash',
  });

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    'prompt': 'the human prompt',
    'task_type': 'the task type, one of "image_generation", "text_generation"',
  });

  
  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      'system',
      `Classify the human message into a task type.
      Format Instructions: {formatInstructions}`,
    ],
    ['human', '{input}'],
  ]);
  
  const formatInstructions = parser.getFormatInstructions();

  const partialPrompt = await promptTemplate.partial({
    formatInstructions,
  })

  const taskClassifier = partialPrompt.pipe(model).pipe(parser);

  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await taskClassifier.invoke({
      input,
    });

    console.log(response);
  }
}

async function getInput() {
  return new Promise<string | null>((resolve, reject) => {
    rl.question('> ', async (input) => {
      if (input === 'exit') {
        rl.close();
        return resolve(null);
      }
      return resolve(input);
    });
  });
}
