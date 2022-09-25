import { Field, ObjectType } from 'type-graphql';
import { Time } from './time';

@ObjectType({ description: "Transaction details" })
export class EthereumTransaction {
    @Field(() => String, { description: 'The transaction hash of a given transaction' })
    public hash!: string;
    @Field(() => Time, { description: 'Timestamp of transaction' })
    public time!: string;
}