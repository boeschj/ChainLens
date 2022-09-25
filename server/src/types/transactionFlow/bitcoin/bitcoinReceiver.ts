import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "The recipient of the transaction" })
export class BitcoinReceiver {
    @Field(() =>
        String
        , { description: 'The public key of the transaction recipient' })
    public address!: String
    @Field(() =>
        String
        , { nullable: true, description: 'An optional annotation to identify the transaction recipient' })
    public annotation?: String
}

