import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

/**
 * Plugin para exemplificar o
 */
@Plugin()
export class DBQueryTest implements ApolloServerPlugin {
  requestDidStart(reqContext): GraphQLRequestListener {
    reqContext.context.dbQueryCount = 0;
    return {
      willSendResponse(reqContext) {
        console.log(
          'Total of "fake" database queries:',
          reqContext.context.dbQueryCount,
        );
      },
    };
  }
}
