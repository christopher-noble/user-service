import { Injectable } from '@nestjs/common';

@Injectable()
export class GetHelloProviderAdapter {
  getHello(): string {
    return 'This sucks';
  }
}
