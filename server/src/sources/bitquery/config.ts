import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

export const BITQUERY_URL = 'https://graphql.bitquery.io';

export const bitqueryAxiosInstance = axios.create({
  baseURL: BITQUERY_URL,
  headers: {
    'X-API-KEY': process.env.BITQUERY_API_KEY ?? ''
  }
});