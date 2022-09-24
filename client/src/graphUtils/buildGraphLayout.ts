
import { hierarchy, tree } from "d3-hierarchy";
import { TreeNode } from "./TreeNode";

const layout = tree<TreeNode<any>>().nodeSize([100, 1000]);

export const mapDataToHierarchyLayout = (address: string, transactionFlowData: any, setRoot: boolean, initialRootData: TreeNode<any>, rootData: TreeNode<any>, map: Map<string, TreeNode<any>>) => {

    const addressTreeNode = map.get(address)!;

    console.log('txflowdata map data', transactionFlowData);

    addressTreeNode.addOutgoings(
        transactionFlowData.outbound.map((transaction: any) => {
            return new TreeNode(map, {
                data: transaction
            }, transaction.receiver.address)
        })
    );

    addressTreeNode.addIncomings(
        transactionFlowData.inbound.map((transaction: any) => {
            return new TreeNode(map, {
                data: transaction
            }, transaction.sender.address)
        })
    );

    const nodesIncoming = layout(hierarchy(setRoot ? initialRootData : rootData, (transaction: any) => transaction.incoming));
    const nodesOutgoing = layout(hierarchy(setRoot ? initialRootData : rootData, (transaction: any) => transaction.outgoing));

    return { nodesIncoming, nodesOutgoing };
}