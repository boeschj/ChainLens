import { ApolloServer, gql } from 'apollo-server';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { ServerResolver } from './resolvers/serverResolver';
import { TransactionFlowResolver } from './resolvers/transactionFlowResolver';
import { Container } from 'typedi';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

export const buildGqlSchema = (): GraphQLSchema => {

    return buildSchemaSync({
        resolvers: [
            ServerResolver,
            TransactionFlowResolver
        ],
        container: Container,
        dateScalarMode: 'isoDate',
    });
};

const schema = buildGqlSchema();

const server = new ApolloServer({
    schema,
    introspection: true,
    csrfPrevention: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                'editor.theme': 'dark',
                'editor.fontFamily': '"Fira Code", "MesloLGS NF", "Menlo", Consolas, Courier New, monospace',
                'editor.reuseHeaders': true,
                'request.credentials': 'same-origin'
            }
        })
    ],
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});