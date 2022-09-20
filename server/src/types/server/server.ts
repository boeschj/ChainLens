import { Authorized, Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Information that you can get from the server' })
export class Server {
  @Field(() => String, { description: 'The current time of the server' })
  public time!: string;
}
