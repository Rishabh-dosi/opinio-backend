import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { Match } from './entities/match.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Prediction]), TeamsModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule { }