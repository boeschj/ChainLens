import { ArgsType, Field, InputType } from 'type-graphql';

//TODO: complete descriptions
@ArgsType()
export class TransactionFlowArgs {
    @Field(() => Number, { nullable: true, description: 'The number of inbound transaction hops to query' })
    public inboundDepth?: number;

    @Field(() => Number, { nullable: true, description: 'The number of outbound transaction hops to query' })
    public outboundDepth?: number;

    @Field(() => String, { nullable: true, description: 'The network to query' })
    public network?: string;

    @Field(() => String, { nullable: true, description: 'The address of a transaction participant' })
    public address?: string;

    @Field(() => String, { nullable: true, description: 'The currency name to query' }) //TODO: replace this with the currency's ERC-20 contract address
    public currency?: string;

    @Field(() => String, { nullable: true, description: 'The start date to fetch transactions from' })
    public from?: string;

    @Field(() => String, { nullable: true, description: 'The end date to fetch transactions from' })
    public till?: string;

    @Field(() => Boolean, { nullable: true, description: 'Optional flag when requesting additional nodes only from the sender or reciever side' })
    public isInbound?: boolean;

    @Field(() => String, { nullable: true, description: 'FILL IN LATER' })
    public transactionFlowNodes?: string;

    @Field(() => String, { nullable: true, description: 'FILL IN LATER' })
    public transactionFlowEdges?: string;
}