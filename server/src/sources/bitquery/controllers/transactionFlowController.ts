import { Transactions } from './../../../types/transactionFlow/transactions';
import { TransactionFlowArgs } from './../../../args/transactionFlow.args';
import { bitqueryAxiosInstance } from '../config';
import { TRANSACTION_FLOW_QUERY } from '../queries/TransactionFlowQuery';

export async function getTransactionFlowData(transactionFlowArgs: TransactionFlowArgs): Promise<Transactions> {
  let responseData: Transactions;
  try {
    await bitqueryAxiosInstance
      .post('', {
        query: TRANSACTION_FLOW_QUERY,
        variables: {
          inboundDepth: transactionFlowArgs.inboundDepth,
          outboundDepth: transactionFlowArgs.outboundDepth,
          network: transactionFlowArgs.network,
          address: transactionFlowArgs.address,
          currency: transactionFlowArgs.currency,
          from: transactionFlowArgs.from,
          till: transactionFlowArgs.till
        }
      })
      .then(
        (response: any) => {
          responseData = response.data.data.ethereum as Transactions;
        },
        (onRejected: any) => {
          console.error('Error in bitquery/controller/getTransactionFlowData', transactionFlowArgs, onRejected);
        }
      );
  } catch (error) {
    console.log(error);
  }
  return responseData!;
}