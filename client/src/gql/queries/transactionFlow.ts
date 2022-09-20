import { gql } from '@apollo/client';

export const TRANSACTION_FLOW = gql`
  query transactionFlow ($address: String!, $inboundDepth: Float!, $outboundDepth: Float!, $currency: String!, $from: String!, $till: String!) {
  transactionFlow (
     inboundDepth:$inboundDepth,
    outboundDepth: $outboundDepth,
    network: "ethereum",
    address: $address,
    currency: $currency,
    from: $from,
    till: $till
    ){
   nodes {
    nodes {
      id
      sender
      data {
        label
      }
      style {
        style
      }
      position {
        x
        y
      }
      sourcePosition
      targetPosition
    }
    edges {
      id
      target
      source
      sourceHandle
      style {
        stroke
        strokeWidth
      }
      label
      animated
      labelStyle {
        fill
        fontWeight
      }
      markerEnd {
        markerEnd
      }
    }
  }
  }
}
`;
