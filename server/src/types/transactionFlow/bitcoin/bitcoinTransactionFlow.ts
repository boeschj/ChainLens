import { ObjectType, Field } from "type-graphql";
import { BitcoinTransactions } from "./bitcoinTransactions";

@ObjectType({ description: "Main container for the bitcoin transaction flow" })
export class BitcoinTransactionFlow {
    @Field(() =>
        BitcoinTransactions
        , { description: 'The list of incoming and outgoing transactions from the target address' })
    public bitcoin!: BitcoinTransactions
}