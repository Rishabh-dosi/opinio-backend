import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from '../../match/entities/match.entity';
import { Team } from 'src/teams/entities/teams.entity';

@Entity('prediction')
export class Prediction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Match, (match) => match.predictions, { nullable: false, onDelete: 'CASCADE' })
    match: Match;

    @ManyToOne(() => Team, { nullable: false, onDelete: 'CASCADE' }) // ✅ Add team reference
    team: Team;

    @Column()
    predictionText: string; // Example: "Will Virat Kohli score 50+ runs?"
    // 
    @Column({default: 0})
    totalTradders: number; 

    @Column({ type: 'enum', enum: ['Pending', 'Yes', 'No'], default: 'Pending' })
    result: 'Pending' | 'Yes' | 'No'; // Updated when match is completed

    @Column({ default: 0 })
    totalBetsYes: number;

    @Column({ default: 0 })
    totalBetsNo: number;

    @Column({ type: 'jsonb', default: [] })
    bet_options_yes: { betAmount: number; winAmount: number }[];
    
    @Column({ type: 'jsonb', default: [] })
    bet_options_no: { betAmount: number; winAmount: number }[];
}
