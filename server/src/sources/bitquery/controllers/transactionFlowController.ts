import { TransactionFlowArgs } from './../../../args/transactionFlow.args';
import { TransactionFlow } from './../interfaces/transactionFlow.interface';
import { bitqueryAxiosInstance } from '../config';
import { TRANSACTION_FLOW_QUERY } from '../queries/TransactionFlowQuery';
import { INBOUND_TRANSACTION_FLOW_QUERY } from '../queries/inboundTransactionFlowQuery';
import { OUTBOUND_TRANSACTION_FLOW_QUERY } from '../queries/outboundTransactionFlowQuery';

export async function getTransactionFlowData(transactionFlowArgs: TransactionFlowArgs): Promise<TransactionFlow> {
  let responseData: TransactionFlow;
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setDate(now.getDate() - 30);
  console.log("transactionFlow args on server hitting here", transactionFlowArgs);
  console.log("heres what date should look like", oneMonthAgo.toISOString());
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
          responseData = response.data.data.ethereum;
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

export async function getInboundTransactionFlowData(
  transactionFlowArgs: TransactionFlowArgs
): Promise<TransactionFlow> {
  let responseData: TransactionFlow;
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setDate(now.getDate() - 30);
  try {
    await bitqueryAxiosInstance
      .post('', {
        query: INBOUND_TRANSACTION_FLOW_QUERY,
        variables: {
          inboundDepth: transactionFlowArgs.inboundDepth,
          network: transactionFlowArgs.network,
          address: transactionFlowArgs.address,
          currency: transactionFlowArgs.currency,
          from: transactionFlowArgs.from,
          till: transactionFlowArgs.till
        }
      })
      .then(
        (response: any) => {
          responseData = response.data.data.ethereum;
        },
        (onRejected: any) => {
          console.error('Error in bitquery/controller/getInboundTransactionFlowData', transactionFlowArgs, onRejected);
        }
      );
  } catch (error) {
    console.log(error);
  }
  return responseData!;
}

export async function getOutboundTransactionFlowData(
  transactionFlowArgs: TransactionFlowArgs
): Promise<TransactionFlow> {
  let responseData: TransactionFlow;
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setDate(now.getDate() - 30);
  try {
    await bitqueryAxiosInstance
      .post('', {
        query: OUTBOUND_TRANSACTION_FLOW_QUERY,
        variables: {
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
          responseData = response.data.data.ethereum;
        },
        (onRejected: any) => {
          console.error('Error in bitquery/controller/getOutboundTransactionFlowData', transactionFlowArgs, onRejected);
        }
      );
  } catch (error) {
    console.log(error);
  }
  return responseData!;
}
