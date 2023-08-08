import { Ctx } from "../ctx"
import { Env } from "../env"
import { Port } from "../port"
import { SignedType } from "../value"

export function compose(env: Env): void {
  const x1 = env.stack.pop() as Port
  const x0 = env.stack.pop() as Port
  env.stack.push(x1, x0)
}

export function cut(ctx: Ctx): void {
  const x1 = ctx.stack.pop() as SignedType
  const x0 = ctx.stack.pop() as SignedType
  ctx.stack.push(x1, x0)
}
