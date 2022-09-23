import layout from "antd/lib/layout";
import { hierarchy } from "d3-hierarchy";
import { useState } from "react";
import ReactFlow, { Controls, useEdgesState, useNodesState, Node } from "react-flow-renderer";
import { client } from "./gql/apolloClient";
import { TRANSACTION_FLOW_IN_OUT } from "./gql/queries/transactionFlowInAndOut";
import { getReactFlowNodesAndEdges } from "./graphUtils/buildElements";
import { TreeNode } from "./graphUtils/TreeNode";

interface IGraphInputs {
  nodes: any[],
  edges: any[],
  handleNodeClick: (_: any, node: Node) => Promise<void>
}
const Graph: React.FC<IGraphInputs> = ({ nodes: inputNodes, edges: inputEdges, handleNodeClick }: IGraphInputs) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(inputNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(inputEdges);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative grid grid-cols-4 h-[700px] w-full bg-gray-100 border border-b-0 border-zinc-900">
      <div className="col-span-4 w-full h-full border border-t-0 border-l-0 border-r-0 border-zinc-900">
        <ReactFlow
          nodes={inputNodes}
          edges={inputEdges}
          onNodesChange={onNodesChange}
          onNodeDoubleClick={handleNodeClick}
          minZoom={-Infinity}
          zoomOnScroll={true}
          style={{ background: '#f4f4f4' }}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>
      {loading ? (
        <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          Loading...
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Graph;
