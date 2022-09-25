import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "Details about a bitcoin transaction" })
export class BitcoinTransaction {
    @Field(() =>
        String
        , { description: 'The transaction hash' })
    public hash!: String
}