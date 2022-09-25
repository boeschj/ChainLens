import { ObjectType, Field } from "type-graphql"
import { BitcoinInbound } from "./bitcoinInbound"
import { BitcoinOutbound } from "./bitcoinOutbound"

@ObjectType({ description: "Object containing the incoming and outgoing transactions" })
export class BitcoinTransactions {
    @Field(() =>
        [BitcoinInbound]
        , { description: "Details about an incoming transaction" })
    public inbound?: BitcoinInbound[]
    @Field(() =>
        [BitcoinOutbound]
        , { description: "Details about an outgoing transaction" })
    public outbound?: BitcoinOutbound[]
}
