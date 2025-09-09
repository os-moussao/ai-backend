import readline from 'readline';
import { humanReadableTaskType } from './programs/taskClassifier/taskClassifier';
let rl: readline.Interface | null;

main();

async function main() {
  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await humanReadableTaskType(input);

    console.log(response);
  }
}

async function getInput() {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  return new Promise<string | null>((resolve, reject) => {
    rl!.question('> ', async (input) => {
      if (input === 'exit') {
        rl!.close();
        return resolve(null);
      }
      return resolve(input);
    });
  });
}
