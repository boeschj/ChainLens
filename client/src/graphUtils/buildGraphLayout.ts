import { hierarchy, tree } from "d3-hierarchy"; import { client } from "../gql/apolloClient";
import { TRANSACTION_FLOW_ETHEREUM } from "../gql/queries/transactionFlow_Ethereum";
import { getReactFlowNodesAndEdges } from "./buildNodesAndEdges";
import { TreeNode } from "./TreeNode";

const layout = tree<TreeNode<any>>().nodeSize([100, 1000]);
const map: Map<string, TreeNode<any>> = new Map();
let nodes;
let edges;
let rootData = new TreeNode<any>(
    map,
    {
        address: ''
    },
    ''
)

const getTransactionData = async (inputAddress: string, queryVariables: any) => {
    const response = await client.query({
        query: TRANSACTION_FLOW_ETHEREUM,
        variables: queryVariables
    });
    return response.data ?? {
        transactionFlow: { inbound: new Array<any>(), outbound: new Array<any>() }
    };
}


const mapDataToTreeNodes = async (inputAddress: string, queryVariables: any) => {
    const treeNode = map.get(inputAddress)!;
    const transactionFlowData = await getTransactionData(inputAddress, queryVariables);

    treeNode.addOutgoings(
        transactionFlowData.transactionFlow.outbound.map((transaction: any) => {
            return new TreeNode(map, {
                data: transaction
            }, transaction.receiver.address)
        })
    );

    treeNode.addIncomings(
        transactionFlowData.transactionFlow.inbound.map((transaction: any) => {
            return new TreeNode(map, {
                data: transaction
            }, transaction.sender.address)
        })
    );
}

export const setGraphLayout = async (inputAddress: string, rootAddress: string, setRoot: boolean = false, queryVariables: any) => {
    const initialRootData = new TreeNode(map, { address: rootAddress, contractType: '', name: '', symbol: '' }, rootAddress);
    rootData = setRoot ? initialRootData : rootData;

    // await mapDataToTreeNodes(inputAddress);
    mapDataToTreeNodes(inputAddress, queryVariables);

    const nodesIncoming = layout(hierarchy(setRoot ? initialRootData : rootData, (transaction: any) => transaction.incoming));
    const nodesOutgoing = layout(hierarchy(setRoot ? initialRootData : rootData, (transaction: any) => transaction.outgoing));
    return { nodes, edges } = getReactFlowNodesAndEdges(nodesIncoming, nodesOutgoing);
}