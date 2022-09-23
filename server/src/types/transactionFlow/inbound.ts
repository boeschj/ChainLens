import { Field, ObjectType } from 'type-graphql';
import { Currency } from './currency';
import { Receiver } from './receiver';
import { Sender } from './sender';
import { Transaction } from './transaction';

@ObjectType({ description: "Transaction details of an incoming transaction from a given address" })
export class Inbound {
    @Field(() =>
        Number
        , { description: 'The amount of currency being sent' })
    public amount!: number;
    @Field(() =>
        Number
        , { description: 'The number of transactions made away from the target address' })
    public depth!: number;
    @Field(() =>
        Transaction
        , { description: 'Details on the transaction occurring' })
    public transaction!: Transaction;
    @Field(() =>
        Currency
        , { description: 'The type of currency being sent' })
    public currency!: Currency;
    @Field(() =>
        Receiver
        , { description: 'The recieving counterparty in the transaction' })
    public receiver!: Receiver;
    @Field(() =>
        Sender
        , { description: 'The sending counterparty in the transaction' })
    public sender!: Sender;
}