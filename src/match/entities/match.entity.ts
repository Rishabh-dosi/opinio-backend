import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Team } from '../../teams/entities/teams.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';

export enum MatchCategory {
    ICC_ODI_WORLD_CUP = "ICC Cricket World Cup(ODI)",
    ICC_T20_WORLD_CUP = "ICC T20 World Cup",
    ICC_TEST_CHAMPIONSHIP = "ICC World Test Championship",
    ICC_CHAMPIONS_TROPHY = "ICC Champions Trophy",
    ASIA_CUP = "Asia Cup",
    U19_WORLD_CUP = "Under - 19 Cricket World Cup",
    WOMENS_ODI_WORLD_CUP = "Women's Cricket World Cup",
    WOMENS_T20_WORLD_CUP = "Women's T20 World Cup",
    IPL = "Indian Premier League(IPL)",
    BBL = "Big Bash League(BBL)",
    CPL = "Caribbean Premier League(CPL)",
    THE_HUNDRED = "The Hundred",
    BPL = "Bangladesh Premier League(BPL)",
    LPL = "Lanka Premier League(LPL)",
    SA20 = "SA20",
    MLC = "Major League Cricket(MLC)"
}

@Entity('match')
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    matchTitle: string; // Example: "India vs Australia - T20 World Cup"

    @ManyToOne(() => Team, { nullable: false })
    teamA: Team;

    @ManyToOne(() => Team, { nullable: false })
    teamB: Team;

    @Column({ type: 'timestamp' })
    matchStartTime: Date;
    
    @Column({ default: null})
    category: string;

    @Column({ type: 'enum', enum: ['Scheduled', 'Live', 'Completed'], default: 'Scheduled' })
    status: 'Scheduled' | 'Live' | 'Completed';

    @OneToMany(() => Prediction, (prediction) => prediction.match, { cascade: true })
    predictions: Prediction[];

    @CreateDateColumn()
    createdAt: Date;
}
