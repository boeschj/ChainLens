import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import {
  getETHTransactionFlowData
} from '../sources/bitquery/controllers/transactionFlowController';
import { TransactionFlowArgs } from '../args/transactionFlow.args';
import { EthereumTransactions } from '../types/transactionFlow/ethereum/ethereumTransactions';

@Service()
@Resolver(EthereumTransactions)
export class TransactionFlowResolver {
  @Query(() => EthereumTransactions, {
    description: 'Retrieves the flow of funds to and from a given address on an Ethereum related network'
  })
  public async EthereumTransactionFlow(
    @Args() transactionFlowArgs: TransactionFlowArgs
  ): Promise<EthereumTransactions> {
    const transactionFlow: EthereumTransactions = await getETHTransactionFlowData(transactionFlowArgs);

    return transactionFlow;
  }
}
