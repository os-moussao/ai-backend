import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function getInput() {
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
