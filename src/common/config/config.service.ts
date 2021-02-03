import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_PROVIDER, IConfig } from './config.provider';

@Injectable()
export class ConfigService {
  public env: string;

  public constructor(
    @Inject(CONFIG_PROVIDER) private readonly configProvider: IConfig,
  ) {
    this.env = process.env.NODE_ENV || 'development';
  }

  public getEnv(key: string): string {
    return process.env[key];
  }

  public get<T>(keyConfig: string, def: any = ''): T {
    let val = this.configProvider.get<T>(keyConfig);
    if (typeof val !== 'string') {
      return val;
    }

    return this.getEnv(val) || val || def;
  }

  public has(keyConfig: string): boolean {
    return this.configProvider.has(keyConfig);
  }
}
