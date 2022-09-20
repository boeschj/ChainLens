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
        SmartContract
        , { nullable: true, description: 'Information about any smart contract interactions' })
    public smartContract?: SmartContract;
}

// export interface CounterParty {
//     address: string;
//     annotation?: string;
//     smartContract: SmartContract;
// }