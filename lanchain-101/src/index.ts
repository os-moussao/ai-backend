import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { config } from './config';
import { urlToBase64Url } from './common/base64-url';
import { PromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts';
import rl from 'readline';

main();
async function main() {
  const model = new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: 'gemini-2.5-flash',
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'If the human message a yes/no question, answer with yes or no. Otherwise, don\'t answer.'],
    ['human', '{input}'],
  ]);

  const yesOrNoModel = prompt.pipe(model);

  const response = await yesOrNoModel.invoke({
    input: 'how is the weather today?',
  });

  console.log(JSON.stringify(response, null, 2));
}

// async function prompt() {
//   rl.question()
// }