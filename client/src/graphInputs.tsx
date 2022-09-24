import React, { useState } from 'react';
import blocktraceLogo from './assets/blocktraceLogo.png';
import { hierarchy, tree } from 'd3-hierarchy';
import {
  ReactFlowProvider,
} from 'react-flow-renderer';
import { Button, DatePicker, Input, Row, Select, Space } from 'antd';
import { client } from './gql/apolloClient';
import { TreeNode } from './graphUtils/TreeNode';
import moment from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker';
import Graph from './graph';
import { TRANSACTION_FLOW_ETHEREUM } from './gql/queries/transactionFlow_Ethereum';
import { getReactFlowNodesAndEdges } from './graphUtils/buildNodesAndEdges';
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

const GraphInputs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);
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

  const getTransactionData = async (inputAddress: string) => {

    const response = await client.query({
      query: TRANSACTION_FLOW_ETHEREUM,
      variables: {
        ...queryParams,
        address: inputAddress
      }
    });

    return response.data ?? {
      transactionFlow: { inbound: new Array<any>(), outbound: new Array<any>() }
    };
  }

  const mapDataToTreeNodes = async (inputAddress: string) => {
    const treeNode = map.get(inputAddress)!;

    const transactionFlowData = await getTransactionData(inputAddress);
    treeNode.addOutgoings(
      transactionFlowData.transactionFlow.outbound.map((transaction: any) => {
        return new TreeNode(map, {
          data: transaction
        }, transaction.receiver.address)
      })
    );

    treeNode.addIncomings(
      transactionFlowData.transactionFlow.inbound.map((transaction: any) => {
        return new TreeNode(map, {
          data: transaction
        }, transaction.sender.address)
      })
    );
  }


  const setTreeRoot = async (inputAddress: string, setRoot: boolean = false) => {
    setLoading(true);
    const initialRootData = new TreeNode(map, { address: address, contractType: '', name: '', symbol: '' }, address);
    setRoot ? setRootData(initialRootData) : setRootData(rootData);

    await mapDataToTreeNodes(inputAddress);

    const nodesIncoming = layout(hierarchy(setRoot ? initialRootData : rootData, (transaction: any) => transaction.incoming));
    const nodesOutgoing = layout(hierarchy(setRoot ? initialRootData : rootData, (transaction: any) => transaction.outgoing));
    const initialElements = getReactFlowNodesAndEdges(nodesIncoming, nodesOutgoing);

    setNodes(initialElements.nodes);
    setEdges(initialElements.edges);
    setLoading(false);
  }

  const { RangePicker } = DatePicker;
  const onDateRangeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) setQueryParams({ ...queryParams, from: dates[0]!.toISOString(), till: dates[1]!.toISOString() })
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
          <Input
            onChange={(e) => {
              setAddress(e.target.value);
              setQueryParams({ ...queryParams, address: e.target.value });
            }}
            style={{ width: '500px' }}
            onPressEnter={() => setTreeRoot(address, true)}
            placeholder="Enter an address"
          />

          <Button
            style={{ backgroundColor: "#18181b", color: "#ffffff" }}
            onClick={() => setTreeRoot(address, true)}>
            Search
          </Button>

        </Row>
      </div>
      <ReactFlowProvider>
        <Graph nodes={nodes} edges={edges} setTreeRoot={setTreeRoot} loading={loading} />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphInputs;
