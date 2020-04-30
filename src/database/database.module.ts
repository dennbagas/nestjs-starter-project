import { Module, DynamicModule } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { EnvService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    autoLoadEntities: true,

    // table name to hold migration history
    migrationsTableName: '_schema_migration_history',
    // tell typeorm to run migration on first connect
    migrationsRun: true,
    // migration folders
    migrations: [join(__dirname, '/migrations/{*.ts,*.js}')],
  });
}

@Module({
  imports: [ConfigurationModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
