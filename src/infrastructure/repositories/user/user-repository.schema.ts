import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserSchema {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ name: 'primary_email', unique: true })
  primaryEmail!: string;

  @Column({ type: 'varchar', name: 'secondary_email', nullable: true })
  secondaryEmail!: string | null;
}
