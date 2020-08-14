import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/user.resolver';
import { CompanyResolver } from './resolvers/company.resolver';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';
import { DBQueryTest } from './util/dbQueryTest';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      tracing: true,
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    UserService,
    CompanyService,
    UserResolver,
    CompanyResolver,
    DBQueryTest,
  ],
})
export class AppModule {}
