import { Field, ObjectType } from 'type-graphql';
import { SmartContract } from './SmartContract'

@ObjectType({ description: "The Transaction Flow parent object" })
export class CounterParty {
    @Field(() => String, { description: 'The address of a transaction participant' })
    public address!: string;

    @Field(() =>
        String
        , { nullable: true, description: 'An optional annotation identifying the transaction participant' })
    public annotation?: string;

    @Field(() =>
        String
        , { nullable: true, description: 'The type of smart contract' })
    public contractType?: string;

    @Field(() =>
        String
        , { description: 'The symbol of the currency' })
    public symbol!: string;

    @Field(() =>
        String
        , { description: 'The name of the currency' })
    public name!: string;
}

// export interface CounterParty {
//     address: string;
//     annotation?: string;
//     smartContract: SmartContract;
// }