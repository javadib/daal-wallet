import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  started = new Date();

  getHello(): string {
    const res = this.startedApp();

    return JSON.stringify(res);
  }

  startedApp() {
    const now = new Date();
    const res = {
      started: this.started.toLocaleString(),
      uptime: (now.getTime() - this.started.getTime()) / 1000,
    };

    return res;
  }
}
