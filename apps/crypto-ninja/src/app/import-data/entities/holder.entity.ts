import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['coinId', 'day', 'month', 'year'])
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

  @Column()
  day: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: number;
}
