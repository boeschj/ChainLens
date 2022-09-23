import { Args, Authorized, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Transactions } from '../types/transactionFlow/transactions';
import {
  getTransactionFlowData
} from '../sources/bitquery/controllers/transactionFlowController';
import { TransactionFlowArgs } from '../args/transactionFlow.args';
import {
  TransactionFlow as ITransactionFlow
} from '../sources/bitquery/interfaces/transactionFlow.interface';

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

    const inbound = transactionFlow.inbound ?? [];
    const outbound = transactionFlow.outbound ?? [];


    return transactionFlow;
    // console.log(inbound.map((transaction) => {
    //   return {
    //     ...transaction,
    //     sender: {
    //       ...transaction.sender
    //     },
    //     receiver: {
    //       ...transaction.receiver
    //     },
    //     currency: {
    //       ...transaction.currency
    //     },
    //     transaction: {
    //       ...transaction.transaction
    //     }
    //   }
    // }))



    // return {
    //   inbound: inbound.map((transaction) => {
    //     return {
    //       ...transaction,
    //       sender: {
    //         ...transaction.sender
    //       },
    //       receiver: {
    //         ...transaction.receiver
    //       },
    //       currency: {
    //         ...transaction.currency
    //       },
    //       transaction: {
    //         ...transaction.transaction
    //       }
    //     }
    //   }),

    //   outbound: outbound.map((transaction) => {
    //     return {
    //       ...transaction,
    //       sender: {
    //         ...transaction.sender
    //       },
    //       receiver: {
    //         ...transaction.receiver
    //       },
    //       currency: {
    //         ...transaction.currency
    //       },
    //       transaction: {
    //         ...transaction.transaction
    //       }
    //     }
    //   })
    // };
  }
}
