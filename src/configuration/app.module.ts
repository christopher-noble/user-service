import { Module } from '@nestjs/common';
import { AppController } from '../application/controllers/app.controller';
import { GetHelloProviderAdapter } from '../domain/providers/get-hello/get.hello.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GetHelloProviderAdapter],
})

export class AppModule { }
