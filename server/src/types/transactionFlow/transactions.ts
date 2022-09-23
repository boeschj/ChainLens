import { Field, ObjectType } from 'type-graphql';
import { Inbound } from './inbound';
import { Outbound } from './outbound';

@ObjectType({ description: 'Transaction associated with the entered address' })
export class Transactions {
  @Field(() => [Inbound], { nullable: true, description: 'The inbound transactions list' })
  public inbound?: Inbound[];

  @Field(() => [Outbound], { nullable: true, description: 'The outbound transactions list' })
  public outbound?: Outbound[];
}