import { BaseMessage } from '@langchain/core/messages';

export function logState(state: any) {
  console.error(`------------ STATE LOGGER ------------`);

  let conversation = (state.messages || [])
    .map((msg: BaseMessage) => `${msg.getType()}: ${msg.text}`)
    .join('\n');

  console.error(`Conversation:`);

  console.error(conversation);

  console.error(`State:`);

  const stateCopy = { ...state, messages: undefined };

  console.error(JSON.stringify(stateCopy, null, 2));

  console.error(` ------------ STATE LOGGER ------------`);
}
