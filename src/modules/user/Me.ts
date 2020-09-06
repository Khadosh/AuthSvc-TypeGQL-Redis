import { Resolver, Ctx, Query } from 'type-graphql';

import { User } from '../../entity/User.entity';
import { MyContext } from '../types/MyContext';

@Resolver()
export class MeResolver {
  @Query(() => User, {nullable: true})
  async me(
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return undefined;

    return await User.findOne({where: {id: ctx.req.session!.userId}});
  }
}
