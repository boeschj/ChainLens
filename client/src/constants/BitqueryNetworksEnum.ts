import { DocumentNode } from "graphql";
import { TRANSACTION_FLOW_ETHEREUM } from "../gql/queries/transactionFlow_Ethereum";

export enum BitqueryNetworksEnum {
    //Ethereum
    EthMainnet = 'ethereum',
    goerli = 'goerli',
    polygonMainnet = 'matic',
    bscMainnet = 'bsc',
    //Bitcoin
    bitcoin = 'bitcoin',
    bitcoinCash = 'bitcash',
    litecoin = 'litecoin',
    dash = 'dash',
    dogecoin = 'dogecoin',
    zcash = 'zcash'
};

export const NetworkToBitqueryEnumMappings = new Map<string, BitqueryNetworksEnum>([
    ["Ethereum Mainnet", BitqueryNetworksEnum.EthMainnet],
    ["Bitcoin Network", BitqueryNetworksEnum.bitcoin],
    ["Polygon Mainnet", BitqueryNetworksEnum.polygonMainnet],
    ["Binance Smart Chain", BitqueryNetworksEnum.bscMainnet],
    ["Goerli Testnet", BitqueryNetworksEnum.goerli],
    ["Dogecoin", BitqueryNetworksEnum.dogecoin],
    ["Litecoin", BitqueryNetworksEnum.litecoin],
    ["Bitcoin Cash", BitqueryNetworksEnum.bitcoinCash],
    ["Dash Network", BitqueryNetworksEnum.dash],
    ["ZCash Network", BitqueryNetworksEnum.zcash],
]);

export const NetworkToQueryMappings = new Map<string, DocumentNode>([
    [BitqueryNetworksEnum.EthMainnet, TRANSACTION_FLOW_ETHEREUM],
    [BitqueryNetworksEnum.goerli, TRANSACTION_FLOW_ETHEREUM],
    [BitqueryNetworksEnum.polygonMainnet, TRANSACTION_FLOW_ETHEREUM],
    [BitqueryNetworksEnum.bscMainnet, TRANSACTION_FLOW_ETHEREUM],
])