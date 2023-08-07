import { Ctx } from "./Ctx"

export function tickTypeVarCounter(ctx: Ctx, name: string): number {
  const foundCounter = ctx.typeVarCounters.get(name)
  if (foundCounter === undefined) {
    ctx.typeVarCounters.set(name, 0)
    return 0
  } else {
    ctx.typeVarCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}
