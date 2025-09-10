import { getInput } from '../../common/io.utils';
import { graph } from './cs.graph';
import crypto from 'crypto';

main();

async function main() {
  const conversationId = crypto.randomUUID();

  while (true) {
    const input = await getInput();
    if (!input) break;

    const response = await graph.invoke(
      {
        messages: [input],
      },
      {
        configurable: {
          thread_id: conversationId,
        },
      }
    );

    console.log(response.messages.at(-1)?.text);
  }
}
