import { gql } from '@apollo/client';

export const TRANSACTION_FLOW_ETHEREUM = gql`
  query transactionFlow(
  $address: String!
  $inboundDepth: Float!
  $outboundDepth: Float!
  $from: String!
  $till: String!
) {
  transactionFlow(
    inboundDepth: $inboundDepth
    outboundDepth: $outboundDepth
    network: "ethereum"
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
