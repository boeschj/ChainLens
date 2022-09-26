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
          ...transactionFlowArgs
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

export async function getLegacyTransactionFlowData(transactionFlowArgs: TransactionFlowArgs): Promise<BitcoinTransactions> {
  let responseData: BitcoinTransactions;
  try {
    await bitqueryAxiosInstance
      .post('', {
        query: BTC_TRANSACTION_FLOW_QUERY,
        variables: {
          ...transactionFlowArgs
        }
      })
      .then(
        (response: any) => {
          responseData = response.data.data.bitcoin as BitcoinTransactions;
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