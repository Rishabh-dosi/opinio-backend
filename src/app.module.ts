import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { MatchModule } from './match/match.module';
import { UsersModule } from './users/users.module';
import { MatchCategoriesModule } from './matchCategory/matchCategories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PredictionModule } from './predictions/predictions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'opinio',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/api/uploads',
    }),
    UsersModule,
    AuthModule,
    TeamsModule,
    MatchModule,
    MatchCategoriesModule,
    PredictionModule,
  ],
})
export class AppModule { }
