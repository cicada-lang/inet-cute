import { Ctx } from "../ctx"
import { Env } from "../env"
import { connect } from "../env/connect"
import { Port } from "../port"
import { SignedType } from "../type"
import { unifySignedTypes } from "../unify/unifySignedTypes"

export function compose(env: Env): void {
  const start = env.stack.pop() as Port
  const end = env.stack.pop() as Port
  connect(env, start, end)
}

export function cut(ctx: Ctx): void {
  const x2 = ctx.stack.pop() as SignedType
  const x1 = ctx.stack.pop() as SignedType
  unifySignedTypes(ctx, x1, x2)
}
