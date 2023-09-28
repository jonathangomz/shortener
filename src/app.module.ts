import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './endpoints/url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './services/auth/auth.service';
import { UserModule } from './endpoints/user/user.module';
import { databaseConfig } from './configuration';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    UrlModule,
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
