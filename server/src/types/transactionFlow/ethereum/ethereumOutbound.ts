import { EthereumSender } from './ethereumSender';
import { Field, ObjectType } from 'type-graphql';
import { EthereumReceiver } from './ethereumReceiver';
import { EthereumCurrency } from './ethereumCurrency';
import { EthereumTransaction } from './ethereumTransaction';

@ObjectType({ description: "Transaction details of an outgoing transaction from a given address" })
export class EthereumOutbound {
    @Field(() =>
        Number
        , { description: 'The amount of currency being sent' })
    public amount!: number;
    @Field(() =>
        Number
        , { description: 'The number of transactions made away from the target address' })
    public depth!: number;
    @Field(() =>
        EthereumTransaction
        , { description: 'Details on the transaction occurring' })
    public transaction!: EthereumTransaction;
    @Field(() =>
        EthereumCurrency
        , { description: 'The type of currency being sent' })
    public currency!: EthereumCurrency;
    @Field(() =>
        EthereumReceiver
        , { description: 'The recieving counterparty in the transaction' })
    public receiver!: EthereumReceiver;
    @Field(() =>
        EthereumSender
        , { description: 'The sending counterparty in the transaction' })
    public sender!: EthereumSender;
}