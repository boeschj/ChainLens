import ReactFlow, { Controls, useEdgesState, useNodesState, Node } from "react-flow-renderer";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from "react";

interface IGraphInputs {
  nodes: any[],
  edges: any[],
  setTreeRoot: (address: string, setRoot: boolean) => Promise<void>,
  loading: boolean
}

const Graph: React.FC<IGraphInputs> = ({ nodes: inputNodes, edges: inputEdges, setTreeRoot: handleNodeClick, loading }: IGraphInputs): JSX.Element => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(inputNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(inputEdges);

  return (
    <div className="relative grid grid-cols-4 h-[700px] w-full bg-gray-100 border border-b-0 border-zinc-900">
      <div className="col-span-4 w-full h-full border border-t-0 border-l-0 border-r-0 border-zinc-900">
        <ReactFlow
          nodes={inputNodes}
          edges={inputEdges}
          onNodesChange={onNodesChange}
          onNodeDoubleClick={(_, node: Node) => handleNodeClick(node.id, false)}
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
          <LoadingOutlined style={{ fontSize: 200 }} spin />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Graph;
