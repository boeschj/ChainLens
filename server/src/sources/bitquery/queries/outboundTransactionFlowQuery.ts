export const OUTBOUND_TRANSACTION_FLOW_QUERY = `query ($network: EthereumNetwork!, $address: String!, $outbundDepth: Int!, $currency: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  ethereum(network: $network) {
    outbound: coinpath(
      initialAddress: {is: $address}
      currency: {is: $currency}
      depth: {lteq: $outbundDepth}
      options: {direction: inbound, asc: "depth", desc: "amount", limitBy: {each: "depth", limit: 10}, limit: 10}
      date: {since: $from, till: $till}
    ) {
      sender {
        address
        annotation
        smartContract {
          contractType
          currency {
            symbol
            name
          }
        }
      }
      receiver {
        address
        annotation
        smartContract {
          contractType
          currency {
            symbol
            name
          }
        }
      }
      amount
      currency {
        symbol
      }
      depth
    }
    
  }
}
`;
