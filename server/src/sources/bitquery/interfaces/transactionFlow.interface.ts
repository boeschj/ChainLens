export interface TransactionFlow {
  inbound: Transaction[];
  outbound: Transaction[];
}

export interface Transaction {
  sender: CounterParty;
  receiver: CounterParty;
  amount: number;
  currency: Currency;
  depth: number;
}

export interface CounterParty {
  address: string;
  annotation?: string;
  smartContract: SmartContract;
}

export interface SmartContract {
  contractType?: string;
  currency: Currency;
}

export interface Currency {
  symbol: string;
  name: string;
}

export interface Nodes {
  nodes: any[];
  edges: any[];
}