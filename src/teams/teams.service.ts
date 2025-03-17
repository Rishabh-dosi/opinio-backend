import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/teams.entity';
import { Player } from './entities/player.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team) private teamRepo: Repository<Team>,
        @InjectRepository(Player) private playerRepo: Repository<Player>,
    ) { }

    async createTeam(data: Partial<Team>) {
        console.log(data, "Service");
        const team = this.teamRepo.create(data);
        return await this.teamRepo.save(team);
    }

    async addPlayer(teamId: number, data: { name: string; role: string }) {
        const team = await this.teamRepo.findOne({ where: { id: teamId } });
        if (!team) throw new NotFoundException('Team not found');

        const player = this.playerRepo.create({ ...data, team });
        return await this.playerRepo.save(player);
    }

    async getTeams() {
        const res = await this.teamRepo.find();
        return res;
    }

    async getTeamById(id: number) {
        const team = await this.teamRepo.findOne({ where: { id }, relations: ['players'] });
        if (!team) throw new NotFoundException('Team not found');
        return team;
    }

    async deleteTeam(id: number) {
        const result = await this.teamRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException('Team not found');
        return { message: 'Team deleted successfully' };
    }

    async findOne(name: string) {
        return this.teamRepo.findOne({ where: { name: name } });
    }
}
