import { ObjectType, Field } from "type-graphql"
import { BitcoinReceiver } from "./bitcoinReceiver"
import { BitcoinSender } from "./bitcoinSender"
import { BitcoinTransaction } from "./bitcoinTransaction"

@ObjectType({ description: "Details about an incoming transaction" })
export class BitcoinInbound {
    @Field(() =>
        Number
        , { description: 'The quantity of currency being transferred' })
    public amount!: Number
    @Field(() =>
        Number
        , { description: 'The depth of the transaction from its source. Probably not useful for most purposes.' })
    public depth!: Number
    @Field(() =>
        BitcoinTransaction
        , { description: 'Details about the transaction' })
    public transaction!: BitcoinTransaction
    @Field(() =>
        BitcoinReceiver
        , { description: "The recipient of the transaction" })
    public receiver!: BitcoinReceiver
    @Field(() =>
        BitcoinSender
        , { description: 'The sender of the transaction' })
    public sender!: BitcoinSender
}