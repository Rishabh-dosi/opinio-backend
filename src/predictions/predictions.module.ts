import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { PredictionService } from './predictions.service';
import { PredictionController } from './predictions.controller';
import { Match } from '../match/entities/match.entity';
import { Team } from 'src/teams/entities/teams.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Prediction, Match, Team])],
    providers: [PredictionService],
    controllers: [PredictionController],
})
export class PredictionModule { }