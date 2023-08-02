import { Ctx, SignedType } from "../ctx"
import { matchTypes } from "./matchTypes"

export function matchSignedTypes(
  ctx: Ctx,
  left: SignedType,
  right: SignedType,
): void {
  if (left.sign === right.sign) {
    throw new Error(`[matchSignedTypes] I expect the sign to be opposite`)
  }

  matchTypes(ctx, left.t, right.t)
}
