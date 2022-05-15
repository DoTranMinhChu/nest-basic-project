import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { ProductModule } from './models/product/product.module';
import { User } from './models/user/entities/user.entity';
import { Product } from './models/product/entities/product.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "mssql",
        host: "localhost",
        port: 1433,
        username: 'sa',
        password: '12345',
        database: 'dbnestjs',
        entities: [User,Product],
        synchronize: true
      }
    ),
    UserModule,
    ProductModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
