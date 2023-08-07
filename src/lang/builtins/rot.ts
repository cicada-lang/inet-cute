import { Ctx } from "../ctx"
import { Env } from "../env"
import { Port } from "../graph"
import { SignedType } from "../type"

export function compose(env: Env): void {
  const x2 = env.ports.pop() as Port
  const x1 = env.ports.pop() as Port
  const x0 = env.ports.pop() as Port
  env.ports.push(x1, x2, x0)
}

export function cut(ctx: Ctx): void {
  const x2 = ctx.signedTypes.pop() as SignedType
  const x1 = ctx.signedTypes.pop() as SignedType
  const x0 = ctx.signedTypes.pop() as SignedType
  ctx.signedTypes.push(x1, x2, x0)
}
