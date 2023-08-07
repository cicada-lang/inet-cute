import { Ctx } from "./Ctx"

export function tickPatternVarCounter(ctx: Ctx, name: string): number {
  const foundCounter = ctx.patternVarCounters.get(name)
  if (foundCounter === undefined) {
    ctx.patternVarCounters.set(name, 0)
    return 0
  } else {
    ctx.patternVarCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}
