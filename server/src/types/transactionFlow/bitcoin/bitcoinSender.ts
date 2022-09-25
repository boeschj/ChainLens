import { ObjectType, Field } from "type-graphql"

@ObjectType({ description: "The sender of a bitcoin transaction" })
export class BitcoinSender {
    @Field(() =>
        String
        , { description: 'The public key of the transaction sender' })
    public address!: String
    @Field(() =>
        String
        , { nullable: true, description: 'An optional annotation to identify the transaction recipient' })
    public annotation?: String
}