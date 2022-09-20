import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new InMemoryCache(),
});