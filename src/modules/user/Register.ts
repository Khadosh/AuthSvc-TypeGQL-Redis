import { Resolver, Query, Mutation, Arg, Authorized, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User.entity';
import { RegisterInput } from './register/input';
import { logger } from '../../middlewares/logger';

@Resolver()
export class RegisterResolver {
  @Authorized()
  @UseMiddleware(logger)
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
