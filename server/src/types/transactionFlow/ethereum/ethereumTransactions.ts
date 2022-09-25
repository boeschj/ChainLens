import { Field, ObjectType } from 'type-graphql';
import { EthereumInbound } from './ethereumInbound';
import { EthereumOutbound } from './ethereumOutbound';

@ObjectType({ description: 'Transaction associated with the entered address' })
export class EthereumTransactions {
  @Field(() => [EthereumInbound], { nullable: true, description: 'The inbound transactions list' })
  public inbound?: EthereumInbound[];

  @Field(() => [EthereumOutbound], { nullable: true, description: 'The outbound transactions list' })
  public outbound?: EthereumOutbound[];
}