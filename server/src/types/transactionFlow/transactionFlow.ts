import { Field, ObjectType } from 'type-graphql';
import { TransactionFlowDetail } from './transactionFlowDetail';

@ObjectType({ description: 'The Transaction Flow parent object' })
export class TransactionFlow {
  @Field(() => [TransactionFlowDetail], { nullable: true, description: 'The inbound and outbound transaction list' })
  public inbound?: TransactionFlowDetail[];

  @Field(() => [TransactionFlowDetail], { nullable: true, description: 'The inbound and outbound transaction list' })
  public outbound?: TransactionFlowDetail[];
}