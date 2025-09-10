import { printGraph } from '../../common/printGraph';
import { getInput } from '../../common/io.utils';
import { graph } from './cs.graph';

main();

async function main() {
  // printGraph(graph);

  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await graph.invoke(
      {
        messages: [input],
      },
      {
        configurable: {
          thread_id: 'testing',
        },
      }
    );

    console.log(response.messages.at(-1)?.text);
  }
}
