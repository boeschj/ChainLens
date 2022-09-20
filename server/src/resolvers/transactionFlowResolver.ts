import { Args, Authorized, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { TransactionFlow } from '../types/transactionFlow/transactionFlow';
import {
  getTransactionFlowData
} from '../sources/bitquery/controllers/transactionFlowController';
import { TransactionFlowArgs } from '../args/transactionFlow.args';
import {
  TransactionFlow as ITransactionFlow
} from '../sources/bitquery/interfaces/transactionFlow.interface';

@Service()
@Resolver(TransactionFlow)
export class TransactionFlowResolver {

  @Query(() => TransactionFlow, {
    description: 'Retrieves the flow of funds to and from a given address'
  })
  public async transactionFlow(
    @Args() transactionFlowArgs: TransactionFlowArgs
  ): Promise<TransactionFlow> {
    const transactionFlow: ITransactionFlow = await getTransactionFlowData(transactionFlowArgs);

    return {
      inbound: transactionFlow.inbound.map((transaction) => {
        return {
          sender: {
            address: transaction.sender.address,
            annotation: transaction.sender.annotation,
            contractType: transaction.sender.smartContract.contractType,
            symbol: transaction.sender.smartContract.currency.symbol,
            name: transaction.sender.smartContract.currency.name
          },
          reciever: {
            address: transaction.receiver.address,
            annotation: transaction.receiver.annotation,
            contractType: transaction.receiver.smartContract.contractType,
            symbol: transaction.receiver.smartContract.currency.symbol,
            name: transaction.receiver.smartContract.currency.name
          },
          amount: transaction.amount,
          symbol: transaction.currency.symbol,
          name: transaction.currency.name,
          depth: transaction.depth
        };
      }),

      outbound: transactionFlow.outbound.map((transaction) => {
        return {
          sender: {
            address: transaction.sender.address,
            annotation: transaction.sender.annotation,
            contractType: transaction.sender.smartContract.contractType,
            symbol: transaction.sender.smartContract.currency.symbol,
            name: transaction.sender.smartContract.currency.name
          },
          reciever: {
            address: transaction.receiver.address,
            annotation: transaction.receiver.annotation,
            contractType: transaction.receiver.smartContract.contractType,
            symbol: transaction.receiver.smartContract.currency.symbol,
            name: transaction.receiver.smartContract.currency.name
          },
          amount: transaction.amount,
          symbol: transaction.currency.symbol,
          name: transaction.currency.name,
          depth: transaction.depth
        };
      })
    };
  }
}
