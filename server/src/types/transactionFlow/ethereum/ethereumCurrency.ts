import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "Details about the currency involved with a transaction" })
export class EthereumCurrency {
    @Field(() =>
        String
        , { description: 'The symbol of the currency' })
    public symbol!: string;
    @Field(() =>
        String
        , { description: 'The name of the currency' })
    public address!: string;
}