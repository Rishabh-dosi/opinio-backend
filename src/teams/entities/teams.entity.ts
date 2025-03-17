import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './player.entity';

@Entity('team')
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
    
    @Column({ default: null })
    abrivation: string;

    @Column({nullable:true})
    country: string;

    @Column()
    logoUrl: string;

    @Column({ type: 'enum', enum: ['IPL', 'WorldCup', 'ChampionsTrophy'], default: 'WorldCup' })
    category: 'IPL' | 'WorldCup' | 'ChampionsTrophy';

    @OneToMany(() => Player, (player) => player.team, { cascade: true })
    players: Player[];
}
