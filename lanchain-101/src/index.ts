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

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      "If the human message a yes/no question, answer with yes or no. Otherwise, answer with some sorry message.",
    ],
    ['human', '{input}'],
  ]);

  const yesOrNoModel = prompt.pipe(model);

  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await yesOrNoModel.invoke({
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
