import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' })

console.log(process.env);

export const BITQUERY_URL = 'https://graphql.bitquery.io';

export const bitqueryAxiosInstance = axios.create({
  baseURL: BITQUERY_URL,
  headers: {
    'X-API-KEY': process.env.BITQUERY_API_KEY ?? ''
  }
});
