import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  TaskClassifierResponse,
  TaskClassifierResponseSchema,
} from './taskClassifier.types';
import { modelsRegistry } from '../../common/models.registry';
import { Runnable } from '@langchain/core/runnables';

export let taskClassifier: Runnable<any, TaskClassifierResponse> | null = null;

export async function getTaskType(
  input: string
): Promise<TaskClassifierResponse> {
  const taskClassifier = await getTaskClassifier();
  return (await taskClassifier.invoke({ input })) as TaskClassifierResponse;
}

export async function getTaskClassifier() {
  if (!taskClassifier) {
    taskClassifier = await createTaskClassifier();
  }
  return taskClassifier;
}

async function createTaskClassifier() {
  const model = modelsRegistry.gemini
    .new('gemini-2.5-flash', { temperature: 0.5 })
    .withStructuredOutput(TaskClassifierResponseSchema);

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', 'Classify the human message into a task type.'],
    ['human', '{input}'],
  ]);

  return promptTemplate.pipe(model);
}

export async function humanReadableTaskType(input: string) {
  const taskClassifier = await getTaskClassifier();

  const model = modelsRegistry.gemini.new('gemini-2.5-flash', {
    temperature: 0.5,
  });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ['ai', 'prompt = {prompt} | taskType = {taskType}'],
    ['human', 'how did the agent classify my prompt?\n'],
  ]);

  const chain = taskClassifier.pipe(promptTemplate).pipe(model);

  return (await chain.invoke({ input })).text;
}
