import * as dotenv from 'dotenv';
dotenv.config();

interface EnvData {
  // application
  APPLICATION_NAME: string;
  SERVER_ENV: string;
  APP_DEBUG: boolean;
  PORT: number;

  // database
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
}

export class EnvService {
  private vars: EnvData;

  constructor() {
    const data: EnvData = {
      APPLICATION_NAME: process.env.APPLICATION_NAME,
      APP_DEBUG: process.env.APP_DEBUG === 'true' ? true : false,
      SERVER_ENV: process.env.SERVER_ENV,
      PORT: +process.env.PORT ?? 8000,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
      DB_PORT: +process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
    };

    this.vars = data;
  }

  read(): EnvData {
    return this.vars;
  }
}
