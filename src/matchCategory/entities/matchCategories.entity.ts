import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('match_categories')
export class MatchCategories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    category_name: string;

}  
    