import React, { useEffect, useState } from 'react';
import { hierarchy, HierarchyPointNode, tree } from 'd3-hierarchy';
import ReactFlow, {
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState
} from 'react-flow-renderer';
import { Input, Row, Select, Spin, Tooltip } from 'antd';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { MarkerType } from 'react-flow-renderer';
import { client } from './gql/apolloClient';
import { CounterParty } from './gql/interfaces/counterParty.interface';
import { TRANSACTION_FLOW_IN_OUT } from './gql/queries/transactionFlowInAndOut';
import { TreeNode } from './graphUtils/TreeNode';
import { getReactFlowNodesAndEdges } from './graphUtils/buildElements';
const { Option } = Select;

const layout = tree<TreeNode<any>>().nodeSize([100, 1000]);
const map: Map<string, TreeNode<any>> = new Map();

const Graph: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [rootData, setRootData] = useState(
    new TreeNode<CounterParty>(
      map,
      {
        address: '',
        contractType: '',
        name: '',
        symbol: '',
      },
      ''
    )
  );
  const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
  const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
  getReactFlowNodesAndEdges(nodesIncoming, nodesOutgoing);
  const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { fitView } = useReactFlow();

  useEffect(() => {
    fitView({ duration: 200 });
  });

  const handleNodeClick = async (_: any, node: Node) => {
    if (loading) return;
    if (node.data.annotation != undefined && node.data.annotation.length > 0) return;

    setLoading(true);
    const response = await client.query({
      query: TRANSACTION_FLOW_IN_OUT,
      variables: {
        inboundDepth: 1,
        outboundDepth: 1,
        address: node.id,
        currency: 'ETH',
        from: '2022-08-01',
        till: '2022-09-06T23:59:59'
      }
    });
    console.log(response);
    const transactionFlowData = response.data ?? {
      transactionFlow: { inbound: new Array<any>(), outbound: new Array<any>() }
    };

    const treeNode = map.get(node.id)!;
    treeNode.addIncomings(
      transactionFlowData.transactionFlow.inbound.map((d: any) => {
        let data = {
          sender: d.sender,
          amount: d.amount,
          symbol: d.symbol
        }
        return new TreeNode(map, data, d.sender.address)
      })
    );
    treeNode.addOutgoings(
      transactionFlowData.transactionFlow.outbound.map((d: any) => new TreeNode(map, d.reciever, d.reciever.address))
    );

    const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
    console.log('nodesIncoming here ===>', nodesIncoming);
    const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
    console.log('nodesOutgoing here ===>', nodesOutgoing);

    const elements = getReactFlowNodesAndEdges(nodesIncoming, nodesOutgoing);


    setNodes(elements.nodes);
    setEdges(elements.edges);
    setLoading(false);
  };


  function updateRoot() {
    const rootData = new TreeNode(map, { address: address, contractType: '', name: '', symbol: '' }, address);
    setRootData(rootData);
    const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
    const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));

    const initialElements = getReactFlowNodesAndEdges(nodesIncoming, nodesOutgoing);
    setNodes(initialElements.nodes);
    setEdges(initialElements.edges);
  }

  return (
    <div className="h-screen">
      <div className="h-20 flex items-center justify-center px-2">
        <Row className="w-full flex items-center">
          <Select defaultValue="1" style={{ width: '200px' }}>
            <Option value="1">Ethereum Mainnet</Option>
            {/* <option value="120">Bitcoin Mainnet</option> */}
          </Select>
          <Input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            style={{ width: '720px' }}
            onPressEnter={updateRoot}
            placeholder="Enter an ethereum address"
          />

          <button
            className="ml-3 cursor-pointer font-sm rounded-sm border border-primary text-background bg-primary px-4 py-1 font-sm sm:text-xs md:text-sm"
            onClick={updateRoot}>
            Search
          </button>
        </Row>
      </div>
      <div className="relative grid grid-cols-4 h-5/6 w-full bg-white border border-b-0 border-gray-300">
        <div className="col-span-4 w-full h-full border border-t-0 border-gray-300">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeDoubleClick={handleNodeClick}
            minZoom={-Infinity}
            zoomOnScroll={true}
            style={{ background: '#0f0f0f0f' }}
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
    </div>
  );
};

const TransactionGraph: React.FC = () => {
  return (
    <div className="h-screen">
      <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider>
    </div>
  );
};

export default TransactionGraph;
