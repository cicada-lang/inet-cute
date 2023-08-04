import { Ctx } from "../ctx"
import { Sign, SignedType } from "../type"
import { formatSignedType } from "../type/formatSignedType"
import { unifyTypes } from "./unifyTypes"

export function unifySignedTypes(
  ctx: Ctx,
  left: SignedType,
  right: SignedType,
): void {
  if (left.sign === -1 && right.sign === 1) {
    unifyTypes(ctx, left.t, right.t)
    return
  }

  if (left.sign === 1 && right.sign === -1) {
    unifyTypes(ctx, left.t, right.t)
    return
  }

  if (left.sign === 0 && right.sign === 0) {
    unifyTypes(ctx, left.t, right.t)
    return
  }

  if (left.sign === 0) {
    unifyTypes(ctx, left.t, right.t)
    setNeutralSignedType(ctx, left, right)
    return
  }

  if (right.sign === 0) {
    unifyTypes(ctx, left.t, right.t)
    setNeutralSignedType(ctx, right, left)
    return
  }

  throw new Error(
    `[unifySignedTypes] I expect the sign to be opposite -- left: ${formatSignedType(
      left,
    )}, right: ${formatSignedType(right)}`,
  )
}

function setNeutralSignedType(
  ctx: Ctx,
  neutralSignedType: SignedType,
  signedType: SignedType,
): void {
  if (neutralSignedType.id === undefined) {
    throw new Error(
      `[setNeutralSignedType] I expect neutralSignedType to have id`,
    )
  }

  const found = ctx.neutralSignedTypes.get(neutralSignedType.id)
  if (found === undefined) {
    throw new Error(
      `[setNeutralSignedType] I can not find neutralSignedType for id: ${neutralSignedType.id}`,
    )
  }

  neutralSignedType.sign = -signedType.sign as Sign
  found.sign = signedType.sign

  ctx.neutralSignedTypes.delete(neutralSignedType.id)

  return
}
