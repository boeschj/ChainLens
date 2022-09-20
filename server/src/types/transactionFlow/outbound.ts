import { Field, ObjectType } from 'type-graphql';
import { CounterParty } from './counterparty';
import { Currency } from './currency';

@ObjectType({ description: "The Transaction Flow parent object" })
export class Outbound {
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
        Currency
        , { description: 'The type of currency being sent' })
    public currency!: Currency;
}


// export interface Transaction {
//     sender?: CounterParty;
//     receiver?: CounterParty;
//     amount?: number;
//     currency?: Currency;
// }