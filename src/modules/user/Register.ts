import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User.entity';
import { RegisterInput } from './register/input';

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async helloWorld() {
    return 'Hola Mundo';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') {email, firstName, lastName, password} : RegisterInput
  ): Promise<User> { 
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    await user.save();

    return user;
  }
}
