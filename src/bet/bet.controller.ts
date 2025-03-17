import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BetService } from './bet.service';
import { Bet } from './entities/bet.entity';

@Controller('bets')
export class BetController {
    constructor(private readonly betService: BetService) { }

    @Post()
    async placeBet(@Body() betData: Partial<Bet>) {
        return this.betService.placeBet(betData);
    }

    @Get('prediction/:id')
    async getBetsByPrediction(@Param('id') predictionId: number) {
        return this.betService.getBetsByPrediction(predictionId);
    }

    @Patch(':id/result')
    async updateBetResult(@Param('id') betId: number, @Body() { result, winAmount }: { result: 'Win' | 'Lose'; winAmount: number }) {
        return this.betService.updateBetResult(betId, result, winAmount);
    }
}
