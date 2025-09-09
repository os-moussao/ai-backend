import { CompiledStateGraph } from '@langchain/langgraph';

export async function printGraph(
  graph: CompiledStateGraph<any, any, any, any, any, any, any>
) {
  console.log('Mermaid diagram:');
  const mermaid = (await graph.getGraphAsync()).drawMermaid();
  console.log(mermaid);
}
