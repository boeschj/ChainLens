import { CounterParty } from "../gql/interfaces/counterParty.interface";
import { TreeNode } from "./TreeNode";
import { HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy';
import {
    Edge,
    Node,
    Position,
} from 'react-flow-renderer';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { MarkerType } from 'react-flow-renderer';


const newNode = (nodeData: HierarchyPointNode<TreeNode<CounterParty>>, incoming: boolean) => {

    const addrSubstring: string = `${nodeData.data.id.substring(0, 8)}...${nodeData.data.id.substring(
        nodeData.data.id.length - 8,
        nodeData.data.id.length
    )}`;

    const labelContent: JSX.Element = (
        <div>
            <div>
                {' '}
                {nodeData.data.data.annotation != undefined && nodeData.data.data.annotation.length > 0
                    ? nodeData.data.data.annotation
                    : addrSubstring}{' '}
            </div>{' '}
            <Tooltip title={'Double click a node to retrieve more transactions.'} color={'#404040'}>
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>{' '}
        </div>
    );

    const nodeStyle: any = {
        width: 400,
        fontWeight: '300',
        fontSize: '20px',
        color: '#333',
        border: '2px solid #d98c01'
    }

    return {
        id: nodeData.data.id as string,
        data: {
            label: labelContent,
            depth: nodeData.depth,
            annotation: nodeData.data.data.annotation
        },
        position: { x: (incoming ? -1 : 1) * nodeData.y, y: nodeData.x },
        style: nodeStyle,
        sourcePosition: Position.Right,
        targetPosition: Position.Left
    }
}

const newEdge = (edgeData: HierarchyPointLink<TreeNode<CounterParty>>, incoming: boolean) => {
    const targetEdgeAddress = edgeData.target.data.data.address;
    const sourceEdgeAddress = edgeData.source.data.data.address;

    const labelStyle = {
        fontSize: '20px'
    }

    const arrowStyle = {
        stroke: incoming ? '#45f542' : '#ba1111',
        strokeWidth: 5,
    }

    return (
        {
            id: `${incoming ? targetEdgeAddress : sourceEdgeAddress}->${incoming ? sourceEdgeAddress : targetEdgeAddress
                }`,
            source: incoming ? targetEdgeAddress : sourceEdgeAddress,
            target: incoming ? sourceEdgeAddress : targetEdgeAddress,
            label: "test",
            labelStyle: labelStyle,
            style: arrowStyle,
            markerEnd: { type: MarkerType.ArrowClosed }
        }
    )
}

/*
Given d-3 descendants and links, we need to convert this data to fit our react-flow graph

@param nodesIncoming incoming transactions, d3-hierarchy nodes to build our data tree for rendering
@param nodesOutgoing outgoing transactions, d3-hierarchy nodes to build our data tree for rendering
*/
export const getReactFlowNodesAndEdges = (
    nodesIncoming: HierarchyPointNode<TreeNode<CounterParty>>,
    nodesOutgoing: HierarchyPointNode<TreeNode<CounterParty>>
) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const seen: Map<string, any> = new Map();

    [nodesIncoming, nodesOutgoing].forEach((value, index) => {
        const incoming: boolean = index === 0;

        for (const d of value.descendants()) {
            if (seen.get(d.data.id) !== undefined) continue;
            nodes.push(newNode(d, incoming));
            seen.set(d.data.id, '');
        }

        value.links().forEach((d) => {
            edges.push(newEdge(d, incoming));
        }
        );
    });

    return { nodes, edges };
}