import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class UsersRules extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user: boolean;

  @Column()
  admin: boolean;

  @Column()
  guest: boolean;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;
}
