import { gql } from '@apollo/client';

export const TRANSACTION_FLOW_GET_ADDITIONAL_NODES = gql`
query AddNodes($nodes: String, $edges: String, $address: String, $inboundDepth: Float, $isInbound: Boolean, $currency: String, $from: String, $till: String) {
  getAdditionalTransactionFlowNodes(transactionFlowNodes: $nodes, transactionFlowEdges: $edges, address: $address, inboundDepth: $inboundDepth, isInbound: $isInbound, network: "ethereum", currency: $currency, from: $from, till: $till ) {
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
`;
