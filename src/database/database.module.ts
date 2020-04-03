import { Module, DynamicModule } from '@nestjs/common';
import { EnvModule } from '../config/config.module';
import { EnvService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  });
}

@Module({
  imports: [EnvModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
