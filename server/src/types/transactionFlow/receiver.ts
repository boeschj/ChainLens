import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "The recipient of a transaction" })
export class Receiver {
    @Field(() => String, { description: 'The address of the transaction recipient' })
    public address!: string;
    @Field(() =>
        String
        , { nullable: true, description: 'An optional annotation identifying the transaction recipient' })
    public annotation?: string;
}