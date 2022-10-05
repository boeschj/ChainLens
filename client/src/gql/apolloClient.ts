import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log('key should be logging here', process.env.REACT_APP_BITQUERY_API_KEY);
console.log('key should be logging here', process.env);
const BITQUERY_URL = 'https://graphql.bitquery.io';

export const client = new ApolloClient({
    uri: BITQUERY_URL,
    cache: new InMemoryCache(),
    headers: {
        'X-API-KEY': process.env.REACT_APP_BITQUERY_API_KEY ?? ''
    }
});