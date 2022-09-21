export class TreeNode<T> {
    public map: Map<any, TreeNode<T>>;
    public data: T;
    public id: any;
    public incoming: TreeNode<T>[] = [];
    public outgoing: TreeNode<T>[] = [];

    constructor(
        map: Map<any, TreeNode<T>>,
        data: T,
        id: any,
        incoming: TreeNode<T>[] = [],
        outgoing: TreeNode<T>[] = []
    ) {
        this.map = map;
        this.data = data;
        this.id = id;
        // Add this node to the map
        this.map.set(this.id, this);
        this.addIncomings(incoming);
        this.addOutgoings(outgoing);
    }

    addIncoming(incoming: TreeNode<T>) {
        // First add it to the map for easy lookup
        this.map.set(this.id, incoming);
        this.incoming.push(incoming);
    }

    addIncomings(incomings: TreeNode<T>[]) {
        incomings.forEach((node) => this.addIncoming(node));
    }

    addOutgoing(outgoing: TreeNode<T>) {
        // First add it to the map for easy lookup
        this.map.set(this.id, outgoing);
        this.outgoing.push(outgoing);
    }

    addOutgoings(outgoings: TreeNode<T>[]) {
        outgoings.forEach((node) => this.addOutgoing(node));
    }
}