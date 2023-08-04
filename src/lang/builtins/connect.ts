import { Ctx } from "../ctx"
import { Port } from "../graph"
import { Net } from "../net"
import { connect } from "../net/connect"
import { SignedType } from "../type"
import { unifySignedTypes } from "../unify/unifySignedTypes"

export function compose(net: Net): void {
  const start = net.ports.pop() as Port
  const end = net.ports.pop() as Port
  connect(net, start, end)
}

export function cut(ctx: Ctx): void {
  const x2 = ctx.signedTypes.pop() as SignedType
  const x1 = ctx.signedTypes.pop() as SignedType
  unifySignedTypes(ctx, x1, x2)
}
