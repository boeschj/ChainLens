import { Field, ObjectType } from 'type-graphql';
import { Currency } from './currency';

@ObjectType({ description: "The Transaction Flow parent object" })
export class SmartContract {
    @Field(() =>
        String
        , { nullable: true, description: 'The type of smart contract' })
    public contractType?: string;

    @Field(() =>
        Currency
        , { nullable: true, description: 'The type of currency being sent' })
    public currency?: Currency;
}

// export interface SmartContract {
//     contractType?: string;
//     currency: Currency;
// }