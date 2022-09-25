import React, { useState } from 'react';
import blocktraceLogo from '../assets/blocktraceLogo.png';
import {
  ReactFlowProvider,
} from 'react-flow-renderer';
import { Button, Input, Modal, Row } from 'antd';
import moment from 'moment';
import TransactionFlowGraph from '../components/TransactionFlowGraph';
import DateRangePicker from '../components/DateRangePicker';
import DropdownListSelect from '../components/DropdownListSelect';
import { BitqueryNetworksEnum } from '../constants/BitqueryNetworksEnum';

export interface IQueryParams {
  inboundDepth: number,
  outboundDepth: number,
  network: string,
  address: string,
  currency: string,
  from: string,
  till: string,
}

const TransactionFlow: React.FC = (): JSX.Element => {
  const [address, setAddress] = useState('');
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    inboundDepth: 1,
    outboundDepth: 1,
    network: BitqueryNetworksEnum.EthMainnet,
    address: '',
    currency: 'ETH',
    from: moment().startOf('week').toISOString(),
    till: moment().toISOString()
  });

  const [search, setSearch] = useState(false);

  const validateAddressAndSearch = () => {
    address && address !== '' ? setSearch(true) : Modal.error(
      {
        title: 'Error: No Address Entered',
        content: 'No address was entered, please enter a valid address and try again.'
      });
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
          <DropdownListSelect queryParams={queryParams} setQueryParams={setQueryParams} />
          <DateRangePicker queryParams={queryParams} setQueryParams={setQueryParams} />
          <Input
            onChange={(e) => {
              setAddress(e.target.value.trim());
              setQueryParams({ ...queryParams, address: e.target.value });
            }}
            style={{ width: '500px' }}
            onPressEnter={validateAddressAndSearch}
            placeholder="Enter a wallet or smart contract address"
          />
          <Button
            style={{ backgroundColor: "#18181b", color: "#ffffff" }}
            onClick={validateAddressAndSearch}>
            Search
          </Button>
        </Row>
      </div>
      <ReactFlowProvider>
        <TransactionFlowGraph address={address} search={search} setSearch={setSearch} queryParams={queryParams} />
      </ReactFlowProvider>
    </div>
  );
};

export default TransactionFlow;