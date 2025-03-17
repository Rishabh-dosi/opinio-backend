import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Prediction } from 'src/predictions/entities/prediction.entity';

@Entity('bet')
export class Bet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId:number

    @ManyToOne(() => Prediction, (prediction) => prediction.id, { nullable: false, onDelete: 'CASCADE' })
    prediction: Prediction;

    @Column({ type: 'enum', enum: ['YES', 'NO'], default: 'YES' })
    betType: 'YES' | 'NO'; // Whether the bet is supporting or against the prediction

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    betAmount: number; // Amount wagered

    @Column({ type: 'enum', enum: ['Pending', 'Win', 'Lose'], default: 'Pending' })
    betResult: 'Pending' | 'Win' | 'Lose'; // Status of the bet

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    winAmount: number; // Amount won if the bet is successful
}
