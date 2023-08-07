import { Ctx } from "../ctx"
import { Env } from "../env"
import { Port } from "../graph"
import { SignedType } from "../type"

export function compose(env: Env): void {
  const x1 = env.stack.pop() as Port
  const x0 = env.stack.pop() as Port
  env.stack.push(x1, x0)
}

export function cut(ctx: Ctx): void {
  const x1 = ctx.signedTypes.pop() as SignedType
  const x0 = ctx.signedTypes.pop() as SignedType
  ctx.signedTypes.push(x1, x0)
}
