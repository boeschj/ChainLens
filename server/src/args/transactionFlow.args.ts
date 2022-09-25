import { ArgsType, Field } from 'type-graphql';

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

    @Field(() => String, { nullable: true, description: 'The ERC-20 contract address of the currency to query' })
    public currency?: string;

    @Field(() => String, { nullable: true, description: 'The start date to fetch transactions from' })
    public from?: string;

    @Field(() => String, { nullable: true, description: 'The end date to fetch transactions from' })
    public till?: string;
}