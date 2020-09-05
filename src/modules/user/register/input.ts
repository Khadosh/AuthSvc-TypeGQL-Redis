import { Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { isEmailUsed } from './isEmailUsed';

@InputType()
export class RegisterInput {
  title: string;
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;

  @Field()
  @IsEmail()
  @isEmailUsed({ message: "Email is already in use"})
  email: string;

  @Field()
  password: string;
}