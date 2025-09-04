import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { config } from './config';
import { urlToBase64Url } from './common/base64-url';
import { PromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts';
import readline from 'readline';
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

  const taskClassifierPromptTemplate = ChatPromptTemplate.fromMessages([
    [
      'system',
      'Classify the human message into a task type: (text-generation or image-processing)',
    ],
    ['human', '{input}'],
  ]);

  const taskClassifier = taskClassifierPromptTemplate.pipe(model);

  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await taskClassifier.invoke({
      input,
    });

    console.log(response.text);
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
