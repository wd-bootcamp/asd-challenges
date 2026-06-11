import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  body!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Type(() => Date)
  createdAt!: Date;
}

export type CreateThreadPayload = Omit<Thread, 'id' | 'createdAt'>;
