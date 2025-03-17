import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './entities/bet.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';
@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Bet) private readonly betRepository: Repository<Bet>,
        @InjectRepository(Prediction) private readonly predictionRepository: Repository<Prediction>
    ) { }

    async placeBet(betData: Partial<Bet>) {
        const prediction = await this.predictionRepository.findOne({ where: { id: betData?.prediction?.id } });
        if (!prediction) {
            throw new NotFoundException('Prediction not found');
        }

        const bet = this.betRepository.create(betData);
        return this.betRepository.save(bet);
    }

    async getBetsByPrediction(predictionId: number) {
        return this.betRepository.find({
            where: { prediction: { id: predictionId } },
            relations: ['prediction'],
        });
    }

    async updateBetResult(betId: number, result: 'Win' | 'Lose', winAmount: number) {
        const bet = await this.betRepository.findOne({ where: { id: betId } });
        if (!bet) {
            throw new NotFoundException('Bet not found');
        }

        bet.betResult = result;
        bet.winAmount = result === 'Win' ? winAmount : 0;
        return this.betRepository.save(bet);
    }
}
