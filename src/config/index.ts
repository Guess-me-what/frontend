import configJson from './config.json';

interface Config {
  SERVER: string;
}

export const config: Config = configJson; 