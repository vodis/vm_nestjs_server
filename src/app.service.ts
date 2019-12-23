import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): Object {
    return {
      message: 'Server is up to running ..',
    };
  }
}
