import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import { Prediction } from 'src/predictions/entities/prediction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bet, Prediction])],
    controllers: [BetController],
    providers: [BetService],
    exports: [BetService],
})
export class BetModule { }
