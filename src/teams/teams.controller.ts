import { Controller, Post, Get, Param, Delete, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './entities/teams.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Multer, diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('api/teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) { }

    
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/',
                filename: (req, file, cb) => {
                    const filename: string = uuidv4() + path.extname(file.originalname);
                    cb(null, filename);
                },
            }),
        }),
    )
    async createTeam(@Body() data: Partial<Team>, @UploadedFile() file: Multer.File) {
        const logoUrl = file ? file.filename : ''
        const newData = {...data, logoUrl}
        return this.teamsService.createTeam(newData);
    }

    @Post(':teamId/players')
    async addPlayer(@Param('teamId') teamId: number, @Body() data: { name: string; role: string }) {
        return this.teamsService.addPlayer(teamId, data);
    }

    @Get()
    async getTeams() {
        return this.teamsService.getTeams();
    }

    @Get(':id')
    async getTeamById(@Param('id') id: number) {
        return this.teamsService.getTeamById(id);
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id: number) {
        return this.teamsService.deleteTeam(id);
    }
}
