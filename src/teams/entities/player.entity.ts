import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './teams.entity';

@Entity('player')
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string; // Batsman, Bowler, All-rounder, etc.

    @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
    team: Team;
}
