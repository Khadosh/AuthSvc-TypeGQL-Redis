import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/modules/types/MyContext';

export const isAuth: MiddlewareFn<MyContext> = async({ context }, next) => {
  if (!context.req.session!.userId)
    throw new Error ("Not Authenticated");

  return next()
}
 
