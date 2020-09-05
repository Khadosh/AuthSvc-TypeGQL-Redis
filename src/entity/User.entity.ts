import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Field()
    fullName(@Root() {firstName, lastName}: User): string {
     return `${firstName} ${lastName}`
    }

    @Column()
    password: string;
}
