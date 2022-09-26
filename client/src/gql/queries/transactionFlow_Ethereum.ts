import { gql } from '@apollo/client';

export const TRANSACTION_FLOW_ETHEREUM = gql`
  query EthereumTransactionFlow(
  $address: String!
  $inboundDepth: Float!
  $outboundDepth: Float!
  $network: String!
  $from: String!
  $till: String!
) {
  EthereumTransactionFlow(
    inboundDepth: $inboundDepth
    outboundDepth: $outboundDepth
    network: $network
    address: $address
    from: $from
    till: $till
  ) {
    inbound {
      amount
      depth
      transaction {
        hash
        time {
          iso8601
        }
      }
      currency {
        symbol
        address
      }
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
    }
    outbound {
      amount
      depth
      transaction {
        hash
        time {
          iso8601
        }
      }
      currency {
        symbol
        address
      }
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
    }
  }
}
`;
