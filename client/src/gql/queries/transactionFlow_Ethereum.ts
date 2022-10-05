import { gql } from '@apollo/client';

export const TRANSACTION_FLOW_ETHEREUM = gql`
  query ($network: EthereumNetwork!, $address: String!, $inboundDepth: Int!, $outboundDepth: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) 
{
  ethereum(network: $network) 
  {
    inbound: coinpath(
      initialAddress: {is: $address}
      depth: {lteq: $inboundDepth}
      options: {direction: inbound, asc: "depth", desc: "amount", limitBy: {each: "depth", limit: 10}, limit: 50}
      date: {since: $from, till: $till}
    ) {
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
      amount
      currency {
        symbol
        address
      }
      depth
      transaction {
        hash
        time {
          iso8601
        }
      }
    }
    outbound: coinpath(
      initialAddress: {is: $address}
      depth: {lteq: $outboundDepth}
      options: {direction: outbound, asc: "depth", desc: "amount", limitBy: {each: "depth", limit: 10}, limit: 50}
      date: {since: $from, till: $till}
    ) 
    {
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
      amount
      currency {
        symbol
        address
      }
      depth
      transaction {
        hash
        time {
          iso8601
        }
      }
    }
  }
}
`;