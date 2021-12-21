import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Holder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coinId: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: number;
}
