import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    TRADER = 'trader',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    mobileNumber: string;
    
    @Column({ unique: true, default: null })
    email: string;
    
    @Column({ default: null })
    password: string;

    @Column({ default: null  })
    userName: string;

    @Column({ nullable: true })
    otp: string;

    @Column({ default: false })
    isOtpVerified: boolean;

    @Column({ default: 0 })
    walletBalance: number;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.TRADER })
    role: UserRole;

    // @OneToMany(() => Bet, (bet) => bet.user, { cascade: true })
    // bets: Bet[];

    @CreateDateColumn()
    createdAt: Date;



}
