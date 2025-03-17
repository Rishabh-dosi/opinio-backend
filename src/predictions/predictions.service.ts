// prediction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
import { Match } from '../match/entities/match.entity';
import { Team } from 'src/teams/entities/teams.entity';

@Injectable()
export class PredictionService {
    constructor(
        @InjectRepository(Prediction)
        private predictionRepository: Repository<Prediction>,
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>

    ) { }

    async getAllPredictions(): Promise<Prediction[]> {
        return this.predictionRepository.find({ relations: ['match'] });
    }

    async getAllPredictionsByMatchId(matchId: number): Promise<Prediction[]> {
        return this.predictionRepository.find({ where: { match: { id: matchId } }, relations: ['match'] });
    }

    async addPrediction(matchId: number, teamId: number, predictionText: string): Promise<Prediction> {
        const match = await this.matchRepository.findOne({ where: { id: matchId } });
        if (!match) throw new Error('Match not found');

        const team = await this.teamRepository.findOne({ where: { id: teamId } });
        if (!team) throw new Error('Team not found');

        const prediction = this.predictionRepository.create({ match, team, predictionText });
        return this.predictionRepository.save(prediction);
    }

    async updatePredictionResult(id: number, result: 'Yes' | 'No'): Promise<Prediction> {
        const prediction = await this.predictionRepository.findOne({ where: { id } });
        if (!prediction) throw new Error('Prediction not found');

        prediction.result = result;
        return this.predictionRepository.save(prediction);
    }

    async deletePrediction(id: number): Promise<void> {
        await this.predictionRepository.delete(id);
    }
}
