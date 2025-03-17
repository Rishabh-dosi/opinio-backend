import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchCategories } from './entities/matchCategories.entity';
import { MatchCategoriesService } from './matchCategory.service';
import { MatchCategoriesController } from './matchCategory.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MatchCategories])],
    controllers: [MatchCategoriesController],
    providers: [MatchCategoriesService],
    exports: [MatchCategoriesService],
})
export class MatchCategoriesModule { }
