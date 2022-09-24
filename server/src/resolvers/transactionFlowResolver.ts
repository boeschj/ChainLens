import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Transactions } from '../types/transactionFlow/transactions';
import {
  getTransactionFlowData
} from '../sources/bitquery/controllers/transactionFlowController';
import { TransactionFlowArgs } from '../args/transactionFlow.args';

@Service()
@Resolver(Transactions)
export class TransactionFlowResolver {
  @Query(() => Transactions, {
    description: 'Retrieves the flow of funds to and from a given address'
  })
  public async transactionFlow(
    @Args() transactionFlowArgs: TransactionFlowArgs
  ): Promise<Transactions> {
    const transactionFlow: Transactions = await getTransactionFlowData(transactionFlowArgs);

    return transactionFlow;
  }
}
