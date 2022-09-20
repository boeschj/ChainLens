import { Field, ObjectType } from 'type-graphql';
import { CounterParty } from './counterparty';
import { Currency } from './currency';

@ObjectType({ description: "The Transaction Flow parent object" })
export class TransactionFlowDetail {
    @Field(() =>
        CounterParty
        , { description: 'The sending counterparty in the transaction' })
    public sender!: CounterParty;

    @Field(() =>
        CounterParty
        , { description: 'The recieving counterparty in the transaction' })
    public reciever!: CounterParty;

    @Field(() =>
        Number
        , { description: 'The amount of currency being sent' })
    public amount!: number;

    @Field(() =>
        String
        , { description: 'The symbol of the currency' })
    public symbol!: string;

    @Field(() =>
        String
        , { nullable: true, description: 'The name of the currency' })
    public name?: string;

    @Field(() =>
        String
        , { description: 'The number of transaction hops deep this transaction is' })
    public depth!: number;
}