import readline from 'readline';
import { getTaskType } from './programs/taskClassifier/taskClassifier';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

main();

async function main() {
  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await getTaskType(input);
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
