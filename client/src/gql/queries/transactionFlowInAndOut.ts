import { gql } from '@apollo/client';

export const TRANSACTION_FLOW_IN_OUT = gql`
  query transactionFlow(
    $address: String!
    $inboundDepth: Float!
    $outboundDepth: Float!
    $currency: String!
    $from: String!
    $till: String!
  ) {
    transactionFlow(
      inboundDepth: $inboundDepth
      outboundDepth: $outboundDepth
      network: "ethereum"
      address: $address
      currency: $currency
      from: $from
      till: $till
    ) {
      inbound {
        sender {
          address
          annotation
          contractType
          symbol
          name
        }
        receiver {
          address
          annotation
          contractType
          symbol
          name
        }
        amount
        symbol
        name
        depth
      }
      outbound {
        sender {
          address
          annotation
          contractType
          symbol
          name
        }
        receiver {
          address
          annotation
          contractType
          symbol
          name
        }
        amount
        symbol
        name
        depth
      }
    }
  }
`;
