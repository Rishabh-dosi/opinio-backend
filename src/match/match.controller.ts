import { Controller, Post, Get, Param, Delete, Body, Patch, NotFoundException } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match, MatchCategory } from './entities/match.entity';
import { TeamsService } from 'src/teams/teams.service';

@Controller('api/matches')
export class MatchController {
    constructor(
        private readonly matchService: MatchService,
        private readonly teamService: TeamsService, // Inject teamService to fetch teams
    ) { }

    @Post()
    async createMatch(@Body() data: { matchTitle: string; teamA: number; teamB: number; matchStartTime: string; category: MatchCategory, status: 'Scheduled', 'Live', 'Completed' }) {
        const teamA = await this.teamService.getTeamById(data.teamA);
        const teamB = await this.teamService.getTeamById(data.teamB);

        if (!teamA || !teamB) {
            throw new NotFoundException('One or both teams not found');
        }

        return this.matchService.createMatch({
            matchTitle: data.matchTitle,
            teamA,
            teamB,
            matchStartTime: new Date(data.matchStartTime),
            category: data.category,
            status: data.status,
        });
    }


    
    @Post(':matchId/predictions')
    async addPrediction(@Param('matchId') matchId: number, @Body() data: { predictionText: string }) {
        return this.matchService.addPrediction(matchId, data.predictionText);
    }

    @Get()
    async getMatches() {
        return this.matchService.getMatches();
    }

    @Get(':id')
    async getMatchById(@Param('id') id: number) {
        return this.matchService.getMatchById(id);
    }

    @Patch(':id/status')
    async updateMatchStatus(@Param('id') id: number, @Body() data: { status: 'Scheduled' | 'Live' | 'Completed' }) {
        return this.matchService.updateMatchStatus(id, data.status);
    }

    @Delete(':id')
    async deleteMatch(@Param('id') id: number) {
        return this.matchService.deleteMatch(id);
    }

}
