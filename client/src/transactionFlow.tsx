import React, { useState } from 'react';
import { hierarchy, HierarchyPointNode, tree } from 'd3-hierarchy';
import ReactFlow, {
  Controls,
  Edge,
  Node,
  Position,
  ReactFlowProvider,
  useNodesState,
  useEdgesState
} from 'react-flow-renderer';
import { TRANSACTION_FLOW_IN_OUT } from '../gql/queries/transactionFlowInAndOut';
import { client } from '../gql/apolloClient';
import AppHeader from '../components/AppHeader';
import { Input, Row, Select, Spin, Tooltip } from 'antd';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { LoaderLogo } from '../components/loaders/loaderLogo';
import { MarkerType } from 'react-flow-renderer';
import BetaLogo from '../components/betaLogo';
import { CounterParty } from '../gql/interfaces/counterParty.interface';
import { useLazyQuery, useQuery } from '@apollo/client';

const layout = tree<TreeNode<CounterParty>>().nodeSize([100, 1000]);

function getElements(
  nodesIncoming: HierarchyPointNode<TreeNode<CounterParty>>,
  nodesOutgoing: HierarchyPointNode<TreeNode<CounterParty>>
) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const seen: Map<string, any> = new Map();
  [nodesIncoming, nodesOutgoing].forEach((value, index) => {
    const incoming: boolean = index === 0;

    for (const d of value.descendants()) {
      if (seen.get(d.data.id) !== undefined) continue;
      const addrSubstring = `${d.data.id.substring(0, 8)}...${d.data.id.substring(
        d.data.id.length - 8,
        d.data.id.length
      )}`;

      nodes.push({
        id: `${d.data.id}`,
        data: {
          label: (
            <div>
              <div>
                {' '}
                {d.data.data.annotation != undefined && d.data.data.annotation.length > 0
                  ? d.data.data.annotation
                  : addrSubstring}{' '}
              </div>{' '}
              <Tooltip title={'Double click a node to retrieve more transactions.'} color={'#404040'}>
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>{' '}
            </div>
          ),
          depth: d.depth,
          annotation: d.data.data.annotation
        },
        position: { x: (incoming ? -1 : 1) * d.y, y: d.x },
        style: {
          // font: '20px sans-serif',
          width: 400,
          fontWeight: '300',
          fontSize: '20px',
          // background: '#D6D5E6',
          color: '#333',
          border: '2px solid #d98c01'
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left
      });
      seen.set(d.data.id, '');
    }

    value.links().forEach((d) =>
      edges.push({
        id: `${incoming ? d.target.data.data.address : d.source.data.data.address}->${incoming ? d.source.data.data.address : d.target.data.data.address
          }`,
        source: incoming ? d.target.data.data.address : d.source.data.data.address,
        target: incoming ? d.source.data.data.address : d.target.data.data.address,
        data: {},
        style: {
          stroke: incoming ? '#45f542' : '#ba1111',
          strokeWidth: 5
        },
        markerEnd: { type: MarkerType.ArrowClosed }
      })
    );
  });

  return { nodes, edges };
}

const map: Map<string, TreeNode<CounterParty>> = new Map();

class TreeNode<T> {
  public map: Map<any, TreeNode<T>>;
  public data: T;
  public id: any;
  public incoming: TreeNode<T>[] = [];
  public outgoing: TreeNode<T>[] = [];

  constructor(
    map: Map<any, TreeNode<T>>,
    data: T,
    id: any,
    incoming: TreeNode<T>[] = [],
    outgoing: TreeNode<T>[] = []
  ) {
    this.map = map;
    this.data = data;
    this.id = id;
    // Add this node to the map
    this.map.set(this.id, this);
    this.addIncomings(incoming);
    this.addOutgoings(outgoing);
  }

  addIncoming(incoming: TreeNode<T>) {
    // First add it to the map for easy lookup
    this.map.set(this.id, incoming);
    this.incoming.push(incoming);
  }

  addIncomings(incomings: TreeNode<T>[]) {
    incomings.forEach((node) => this.addIncoming(node));
  }

  addOutgoing(outgoing: TreeNode<T>) {
    // First add it to the map for easy lookup
    this.map.set(this.id, outgoing);
    this.outgoing.push(outgoing);
  }

  addOutgoings(outgoings: TreeNode<T>[]) {
    outgoings.forEach((node) => this.addOutgoing(node));
  }
}

interface graphElements {
  nodes: Node[];
  edges: Edge[];
}

const Graph: React.FC = () => {
  const [address, setAddress] = useState('');
  const [rootData, setRootData] = useState(
    new TreeNode<CounterParty>(
      map,
      {
        address: '',
        contractType: '',
        name: '',
        symbol: ''
      },
      ''
    )
  );


  const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
  const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
  const initialElements = getElements(nodesIncoming, nodesOutgoing);
  const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  let graphElements: any[] = [];

  const [
    getTransactionFlowData,
    { loading, error, data }
  ] = useLazyQuery(TRANSACTION_FLOW_IN_OUT);


  const handleSearch = async () => {

    const queryDepth = 4;
    const rootData = new TreeNode(map, { address: address, contractType: '', name: '', symbol: '' }, address);
    setRootData(rootData);
    let nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
    let nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
    const initialElements = getElements(nodesIncoming, nodesOutgoing);
    setNodes(initialElements.nodes);
    setEdges(initialElements.edges);

    const response = await getTransactionFlowData(
      {
        variables: {
          inboundDepth: queryDepth,
          outboundDepth: queryDepth,
          address: '0x0e9363c3492253384c4f6cc3fcb61e51b537f8f4',
          currency: 'ETH',
          from: '2021-08-01',
          till: '2022-01-01'
        }
      }
    )

    const queryData = response.data ?? {
      transactionFlow: { inbound: new Array<CounterParty>(), outbound: new Array<CounterParty>() }
    };

    const treeNode = map.get(rootData.id)!;
    treeNode.addIncomings(
      queryData.transactionFlow.inbound.filter((trans: any) => trans.depth == 1).map((d: any) => new TreeNode(map, d.sender, d.sender.address))
    );
    treeNode.addOutgoings(
      queryData.transactionFlow.outbound.filter((trans: any) => trans.depth == 1).map((d: any) => new TreeNode(map, d.reciever, d.reciever.address))
    );

    nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
    nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
    const elements = getElements(nodesIncoming, nodesOutgoing);
    graphElements = elements.nodes;

    setNodes(elements.nodes);
    setEdges(elements.edges);

    for (let i = 2; i < queryDepth; i++) {

      graphElements.forEach((node: any) => {
        const treeNode = map.get(node.id)!;
        treeNode.addIncomings(
          queryData.transactionFlow.inbound.filter((trans: any) => trans.depth == i && trans.reciever.address === node.id).map((d: any) => new TreeNode(map, d.sender, d.sender.address))
        );
        treeNode.addOutgoings(
          queryData.transactionFlow.outbound.filter((trans: any) => trans.depth == i && trans.sender.address === node.id).map((d: any) => new TreeNode(map, d.reciever, d.reciever.address))
        );

        nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
        nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));

        const elements = getElements(nodesIncoming, nodesOutgoing);
        graphElements = elements.nodes;

        setNodes(elements.nodes);
        setEdges(elements.edges);
      })
    }
  };

  const handleNodeClick = async (_: any, node: Node) => {
    if (loading) return;
    if (node.data.annotation != undefined && node.data.annotation.length > 0) return;

    const response = await client.query({
      query: TRANSACTION_FLOW_IN_OUT,
      variables: {
        inboundDepth: 1,
        outboundDepth: 1,
        address: node.id,
        currency: 'ETH',
        from: '2021-08-01',
        till: '2022-07-06T23:59:59'
      }
    });
    const queryData = response.data ?? {
      transactionFlow: { inbound: new Array<CounterParty>(), outbound: new Array<CounterParty>() }
    };
    const treeNode = map.get(node.id)!;
    treeNode.addIncomings(
      queryData.transactionFlow.inbound.map((d: any) => new TreeNode(map, d.sender, d.sender.address))
    );
    treeNode.addOutgoings(
      queryData.transactionFlow.outbound.map((d: any) => new TreeNode(map, d.reciever, d.reciever.address))
    );

    const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
    const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
    const elements = getElements(nodesIncoming, nodesOutgoing);
    setNodes(elements.nodes);
    setEdges(elements.edges);
  };

  function updateRoot() {
    const rootData = new TreeNode(map, { address: address, contractType: '', name: '', symbol: '' }, address);
    setRootData(rootData);
    const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
    const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));
    const initialElements = getElements(nodesIncoming, nodesOutgoing);
    setNodes(initialElements.nodes);
    setEdges(initialElements.edges);
  }

  return (
    <div className="h-screen">
      <AppHeader />
      <div className="h-20 flex items-center justify-center px-2">
        <Row className="w-full flex items-center">
          <Select defaultValue="1" style={{ width: '200px' }}>
            <option value="1">Ethereum Mainnet</option>
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
            onClick={handleSearch}>
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
            fitView>
            <Controls />
          </ReactFlow>
        </div>
        {loading ? (
          <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <LoaderLogo />
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
      <BetaLogo />
    </div>
  );
};

export default TransactionGraph;
