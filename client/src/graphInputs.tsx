import React, { useState } from 'react';
import blocktraceLogo from './assets/blocktraceLogo.png';
import {
  ReactFlowProvider,
} from 'react-flow-renderer';
import { Button, Input, Row } from 'antd';
import moment from 'moment';
import Graph from './graph';
import DateRangePicker from './components/DateRangePicker';
import DropdownListSelect from './components/DropdownListSelect';

export interface IQueryParams {
  inboundDepth: number,
  outboundDepth: number,
  address: string,
  currency: string,
  from: string,
  till: string,
}

const GraphInputs: React.FC = () => {
  const [address, setAddress] = useState('');
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    inboundDepth: 1,
    outboundDepth: 1,
    address: '',
    currency: 'ETH',
    from: moment().startOf('week').toISOString(),
    till: moment().toISOString()
  });

  const [search, setSearch] = useState(false);

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
              setAddress(e.target.value);
              setQueryParams({ ...queryParams, address: e.target.value });
            }}
            style={{ width: '500px' }}
            onPressEnter={() => setSearch(true)}
            placeholder="Enter an address"
          />
          <Button
            style={{ backgroundColor: "#18181b", color: "#ffffff" }}
            onClick={() => setSearch(true)}>
            Search
          </Button>
        </Row>
      </div>
      <ReactFlowProvider>
        <Graph address={address} search={search} setSearch={setSearch} queryParams={queryParams} />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphInputs;