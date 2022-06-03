import path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { DatabaseModule } from '../database/database.module';
import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';
import { MessagingModule } from '../messaging/messaging.module';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      // driver: ApolloDriver,
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    // Services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
