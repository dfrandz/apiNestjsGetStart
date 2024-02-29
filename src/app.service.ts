import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data: number): string {
    return `Hello World! ${data}`;
  }
}
