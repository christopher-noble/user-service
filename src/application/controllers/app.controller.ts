import { Controller, Get } from '@nestjs/common';
import { GetHelloProviderAdapter } from '../../domain/providers/get-hello/get.hello.provider';

//This is for testing the connection. Can remove this later
@Controller()
export class AppController {
  constructor(private readonly getHelloProvider: GetHelloProviderAdapter) { }

  @Get()
  getHello(): string {
    return this.getHelloProvider.getHello();
  }
}
