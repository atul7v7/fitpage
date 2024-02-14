import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { cascade: true })
  @Column({ name: "userId" })
  userId: number;
}
