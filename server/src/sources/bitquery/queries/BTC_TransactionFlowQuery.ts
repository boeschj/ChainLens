export const BTC_TRANSACTION_FLOW_QUERY =
  `query ($network: BitcoinNetwork!, $address: String!, $inboundDepth: Int!, $outboundDepth: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  bitcoin(network: $network) {
    inbound: coinpath(
      initialAddress: {is: $address}
      depth: {lteq: $inboundDepth}
      options: {direction: inbound, asc: "depth", desc: "amount", limitBy: {each: "depth", limit: 10}}
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
      depth
      transaction {
        hash
      }
    }
    outbound: coinpath(
      initialAddress: {is: $address}
      depth: {lteq: $outboundDepth}
      options: {asc: "depth", desc: "amount", limitBy: {each: "depth", limit: 10}}
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
      depth
      transaction {
        hash
      }
    }
  }
}
`;
