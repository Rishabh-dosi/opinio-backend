import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';
@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match) private matchRepo: Repository<Match>,
        @InjectRepository(Prediction) private predictionRepo: Repository<Prediction>,
    ) { }

    async createMatch(data:Partial<Match>) {
        const match = this.matchRepo.create(data);
        return await this.matchRepo.save(match);
    }

    async addPrediction(matchId: number, predictionText: string) {
        const match = await this.matchRepo.findOne({ where: { id: matchId } });
        if (!match) throw new NotFoundException('Match not found');

        const prediction = this.predictionRepo.create({ match, predictionText });
        return await this.predictionRepo.save(prediction);
    }

    async getMatches() {
        return await this.matchRepo.find({ relations: ['teamA', 'teamB', 'predictions'] });
    }

    async getMatchById(id: number) {
        const match = await this.matchRepo.findOne({ where: { id }, relations: ['teamA', 'teamB', 'predictions'] });
        if (!match) throw new NotFoundException('Match not found');
        return match;
    }

    async updateMatchStatus(id: number, status: 'Scheduled' | 'Live' | 'Completed') {
        const match = await this.matchRepo.findOne({ where: { id } });
        if (!match) throw new NotFoundException('Match not found');

        match.status = status;
        return await this.matchRepo.save(match);
    }

    async deleteMatch(id: number) {
        const result = await this.matchRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException('Match not found');
        return { message: 'Match deleted successfully' };
    }
}
