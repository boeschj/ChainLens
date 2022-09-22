import React, { useEffect, useState } from 'react';
import blocktraceLogo from './assets/blocktraceLogo.png';
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
import { Button, DatePicker, Input, Row, Select, Space, Spin, Tooltip } from 'antd';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { MarkerType } from 'react-flow-renderer';
import { client } from './gql/apolloClient';
import { CounterParty } from './gql/interfaces/counterParty.interface';
import { TRANSACTION_FLOW_IN_OUT } from './gql/queries/transactionFlowInAndOut';
import { TreeNode } from './graphUtils/TreeNode';
import { getReactFlowNodesAndEdges } from './graphUtils/buildElements';
import moment from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker';
const { Option } = Select;


interface IQueryParams {
  inboundDepth: number,
  outboundDepth: number,
  address: string,
  currency: string,
  from: string,
  till: string,
}


const layout = tree<TreeNode<any>>().nodeSize([100, 1000]);
const map: Map<string, TreeNode<any>> = new Map();

const Graph: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    inboundDepth: 1,
    outboundDepth: 1,
    address: '',
    currency: 'ETH',
    from: moment().startOf('week').toISOString(),
    till: moment().toISOString()
  });
  const [rootData, setRootData] = useState(
    new TreeNode<any>(
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

  // let rootData = new TreeNode<any>(
  //   map,
  //   {
  //     address: 'test',
  //     contractType: 'test',
  //     name: 'test',
  //     symbol: 'test',
  //   },
  //   'test'
  // )

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

  // const getTransactionFlowData = async (address: string, queryParameters: IQueryParams) => {
  //   console.log('calling transaction flow');
  //   setLoading(true);
  //   const response = await client.query({
  //     query: TRANSACTION_FLOW_IN_OUT,
  //     variables: {
  //       // inboundDepth: 1,
  //       // outboundDepth: 1,
  //       // address: address,
  //       // currency: 'ETH',
  //       // from: '2022-08-01',
  //       // till: '2022-09-06T23:59:59'
  //       ...queryParameters,
  //     }
  //   });
  //   const transactionFlowData = response.data ?? {
  //     transactionFlow: { inbound: new Array<any>(), outbound: new Array<any>() }
  //   };

  //   const treeNode = map.get(address)!;
  //   treeNode.addIncomings(
  //     transactionFlowData.transactionFlow.inbound.map((d: any) => {
  //       let data = {
  //         sender: d.sender,
  //         amount: d.amount,
  //         symbol: d.symbol
  //       }
  //       return new TreeNode(map, data, d.sender.address)
  //     })
  //   );
  //   // treeNode.addOutgoings(
  //   //   transactionFlowData.transactionFlow.outbound.map((d: any) => new TreeNode(map, d.reciever, d.reciever.address))
  //   // );
  //   treeNode.addOutgoings(
  //     transactionFlowData.transactionFlow.outbound.map((d: any) => {
  //       let data = {
  //         reciever: d.reciever,
  //         amount: d.amount,
  //         symbol: d.symbol
  //       }
  //       return new TreeNode(map, data, d.reciever.address)
  //     })
  //   );

  //   return treeNode;
  // };

  // const handleNodeClick = async (_: any, node: Node) => {
  //   console.log('loggin node', node);
  //   if (loading) return;
  //   // if (node.data.annotation != undefined && node.data.annotation.length > 0) return;

  //   console.log(queryParams);
  //   await getTransactionFlowData(node.id, {
  //     ...queryParams,
  //     inboundDepth: 1,
  //     outboundDepth: 1
  //   });

  //   console.log("rootData here", rootData);

  //   const nodesIncoming = layout(hierarchy(rootData, (d: any) => d.incoming));
  //   const nodesOutgoing = layout(hierarchy(rootData, (d: any) => d.outgoing));

  //   const elements = getReactFlowNodesAndEdges(nodesIncoming, nodesOutgoing);


  //   setNodes(elements.nodes);
  //   setEdges(elements.edges);
  //   setLoading(false);
  // };

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
      transactionFlowData.transactionFlow.outbound.map((d: any) => {
        let data = {
          reciever: d.reciever,
          amount: d.amount,
          symbol: d.symbol
        }
        return new TreeNode(map, data, d.reciever.address)
      })
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

  const { RangePicker } = DatePicker;

  const onDateRangeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

      setQueryParams({ ...queryParams, from: dates[0]!.toISOString(), till: dates[1]!.toISOString() })
    } else {
      console.log('Clear');
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row content-center space-x-5 justify-start align-center h-[100px] bg-zinc-900">
        <img src={blocktraceLogo} alt="" height={'100px'} width={'100px'} />
        <div className="text-[50px] text-white self-center font-mono">
          BlockTrace
        </div>
      </div>
      <div className="h-20 flex items-center justify-center px-2">
        <Row className="w-full flex items-center space-x-2">
          <Input.Group compact style={{ width: 'fit-content' }}>
            <Select defaultValue="1" style={{ width: '200px' }}>
              <Option value="1">Ethereum Mainnet</Option>
              {/* <option value="120">Bitcoin Mainnet</option> */}
            </Select>
            <Select defaultValue="1" style={{ width: '75px' }}>
              <Option value="1">ETH</Option>
              {/* <option value="120">Bitcoin Mainnet</option> */}
            </Select>
          </Input.Group>





          <Space direction="vertical" size={10} style={{ width: '230px' }}>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                'This Week': [moment().startOf('week'), moment()],
                'This Month': [moment().startOf('month'), moment()],
                'This Year': [moment().startOf('year'), moment()],
              }}
              format="YYYY/MM/DD"
              defaultValue={[moment().startOf('week'), moment()]}
              onChange={onDateRangeChange}
            />
          </Space>

          <Input.Group compact style={{ width: 'fit-content', height: 'fit-content' }}>
            <Select placeholder="Inbound Depth" onChange={(value: number) => setQueryParams({ ...queryParams, inboundDepth: value })}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
            </Select>
            <Select placeholder="Outbound Depth" onChange={(value: number) => setQueryParams({ ...queryParams, outboundDepth: value })}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
            </Select>
          </Input.Group>

          <Input
            onChange={(e) => {
              setAddress(e.target.value);
              setQueryParams({ ...queryParams, address: e.target.value });
            }}
            style={{ width: '500px' }}
            onPressEnter={updateRoot}
            placeholder="Enter an address"
          />

          <Button
            style={{ backgroundColor: "#18181b", color: "#ffffff" }}
            onClick={updateRoot}>
            Search
          </Button>

        </Row>
      </div>
      <div className="relative grid grid-cols-4 h-[700px] w-full bg-gray-100 border border-b-0 border-zinc-900">
        <div className="col-span-4 w-full h-full border border-t-0 border-l-0 border-r-0 border-zinc-900">
          <ReactFlow
            nodes={nodes}
            edges={edges}
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
