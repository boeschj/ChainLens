import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "The sending counterparty of a transaction" })
export class Sender {
    @Field(() => String, { description: 'The address of the sender' })
    public address!: string;
    @Field(() =>
        String
        , { nullable: true, description: 'An optional annotation identifying the transaction sender' })
    public annotation?: string;
}