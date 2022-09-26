import { gql } from '@apollo/client';

export const TRANSACTION_FLOW_LEGACY = gql`
  query transactionFlow(
  $address: String!
  $network: String!
  $inboundDepth: Float!
  $outboundDepth: Float!
  $from: String
  $till: String!
) {
  LegacyTransactionFlow(
    inboundDepth: $inboundDepth
    outboundDepth: $outboundDepth
    network: $network
    address: $address
    from: $from
    till: $till
  ) {
    inbound {
      amount
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
      transaction {
        hash
      }
    }
    outbound {
      amount
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
      transaction {
        hash
      }
    }
  }
}
`;
