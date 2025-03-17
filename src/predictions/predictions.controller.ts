// prediction.controller.ts
import { Controller, Get, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { PredictionService } from './predictions.service';
import { Prediction } from './entities/prediction.entity';

@Controller('api/predictions')
export class PredictionController {
    constructor(private readonly predictionService: PredictionService) { }

    @Get()
    getAllPredictions(): Promise<Prediction[]> {
        return this.predictionService.getAllPredictions();
    }

    @Get(':matchId')
    getAllPredictionsByMatchId(@Param('matchId') matchId: number): Promise<Prediction[]> {
        return this.predictionService.getAllPredictionsByMatchId(matchId);
    }

    @Post()
    addPrediction(
        @Body() predictionData: { matchId: number; teamId: number; predictionText: string }
    ): Promise<Prediction> {
        return this.predictionService.addPrediction(
            predictionData.matchId,
            predictionData.teamId,
            predictionData.predictionText
        );
    }

    @Patch(':id')
    updatePredictionResult(
        @Param('id') id: number,
        @Body('result') result: 'Yes' | 'No',
    ): Promise<Prediction> {
        return this.predictionService.updatePredictionResult(id, result);
    }

    @Delete(':id')
    deletePrediction(@Param('id') id: number): Promise<void> {
        return this.predictionService.deletePrediction(id);
    }
}
