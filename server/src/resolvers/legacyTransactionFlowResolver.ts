import { Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import {
  getLegacyTransactionFlowData,
} from '../sources/bitquery/controllers/transactionFlowController';
import { TransactionFlowArgs } from '../args/transactionFlow.args';
import { BitcoinTransactionFlow } from '../types/transactionFlow/bitcoin/bitcoinTransactionFlow';
import { BitcoinTransactions } from '../types/transactionFlow/bitcoin/bitcoinTransactions';

@Service()
@Resolver(BitcoinTransactions)
export class LegacyTransactionFlowResolver {
  @Query(() => BitcoinTransactions, {
    description: 'Retrieves the flow of funds to and from a given address on an Ethereum related network'
  })
  public async LegacyTransactionFlow(
    @Args() transactionFlowArgs: TransactionFlowArgs
  ): Promise<BitcoinTransactions> {
    const transactionFlow: BitcoinTransactionFlow = await getLegacyTransactionFlowData(transactionFlowArgs);
    return transactionFlow.bitcoin;
  }
}