import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/modules/types/MyContext';

export const logger: MiddlewareFn<MyContext> = async({info: { path: { key, typename } }}, next) => {
  console.log(`--- Logger: [${typename}: ${key}]`)

  return next()
}
 
