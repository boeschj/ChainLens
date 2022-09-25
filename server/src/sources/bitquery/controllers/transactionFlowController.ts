import { BitcoinTransactionFlow } from '../../../types/transactionFlow/bitcoin/bitcoinTransactionFlow';
import { TransactionFlowArgs } from './../../../args/transactionFlow.args';
import { bitqueryAxiosInstance } from '../config';
import { ETH_TRANSACTION_FLOW_QUERY } from '../queries/ETH_TransactionFlowQuery';
import { BTC_TRANSACTION_FLOW_QUERY } from '../queries/BTC_TransactionFlowQuery';
import { EthereumTransactions } from '../../../types/transactionFlow/ethereum/ethereumTransactions';
import { BitcoinTransactions } from '../../../types/transactionFlow/bitcoin/bitcoinTransactions';

export async function getETHTransactionFlowData(transactionFlowArgs: TransactionFlowArgs): Promise<EthereumTransactions> {
  let responseData: EthereumTransactions;
  try {
    await bitqueryAxiosInstance
      .post('', {
        query: ETH_TRANSACTION_FLOW_QUERY,
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
          responseData = response.data.data.ethereum as EthereumTransactions;
        },
        (onRejected: any) => {
          console.error('Error in bitquery/controller/getETHTransactionFlowData', transactionFlowArgs, onRejected);
        }
      );
  } catch (error) {
    console.log(error);
  }
  return responseData!;
}

export async function getLegacyTransactionFlowData(transactionFlowArgs: TransactionFlowArgs): Promise<BitcoinTransactionFlow> {
  let responseData: BitcoinTransactionFlow;
  try {
    await bitqueryAxiosInstance
      .post('', {
        query: BTC_TRANSACTION_FLOW_QUERY,
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
          responseData = response.data.data as BitcoinTransactionFlow;
        },
        (onRejected: any) => {
          console.error('Error in bitquery/controller/getBTCTransactionFlowData', transactionFlowArgs, onRejected);
        }
      );
  } catch (error) {
    console.log(error);
  }
  return responseData!;
}