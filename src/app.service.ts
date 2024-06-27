import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  started = new Date();

  getHello(): string {
    const now = new Date();
    const res = {
      started: this.started.toLocaleString(),
      uptime: (now.getTime() - this.started.getTime()) / 1000,
    };

    // let hello = await this.igService.getHello();

    return JSON.stringify(res);
  }
}
