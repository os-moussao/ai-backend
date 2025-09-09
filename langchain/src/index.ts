import { getInput } from './common/io.utils';
import { humanReadableTaskType } from './programs/taskClassifier/taskClassifier';

main();

async function main() {
  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await humanReadableTaskType(input);

    console.log(response);
  }
}
