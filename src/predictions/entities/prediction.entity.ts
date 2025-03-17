import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from '../../match/entities/match.entity';

@Entity('prediction')
export class Prediction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Match, (match) => match.predictions, { nullable: false, onDelete: 'CASCADE' })
    match: Match;

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
}
