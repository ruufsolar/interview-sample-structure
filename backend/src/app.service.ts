import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

const THE_ONE_WHO_ROCKS = "THE_ONE_WHO_ROCKS";

@Injectable()
export class AppService {
  constructor(
    private dataSource: DataSource,
  ) {}

  async getHello(): Promise<string> {
    const theOneWhoRocks = process.env[THE_ONE_WHO_ROCKS];
    let connectionStatus: string;
    if (this.dataSource.isInitialized) {
      connectionStatus = "DB connection was successful :)";
    } else {
      connectionStatus = "Failed to connect to DB :(";
    }
    return `${theOneWhoRocks} Rocks! ${connectionStatus}`
  }
}
