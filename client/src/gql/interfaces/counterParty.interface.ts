export interface CounterParty {
  // The address of a transaction participant
  address: string;

  // An optional annotation identifying the transaction participant
  annotation?: string;

  // The type of smart contract
  contractType: string;

  // The symbol of the currency
  symbol: string;

  // The name of the currency
  name: string;
}
