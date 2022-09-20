import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Server } from '../types/server/server';

@Service()
@Resolver(Server)
export class ServerResolver {
  @Query(() => Server, {
    description: 'Query the Server object'
  })
  public server(): Server {
    return {
      time: Date().toString(),
    };
  }
}
