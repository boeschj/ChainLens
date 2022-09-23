import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "Timestamp of transaction" })
export class Time {
    @Field(() => String, { description: 'Timestamp of transaction' })
    public iso8601!: string;
}