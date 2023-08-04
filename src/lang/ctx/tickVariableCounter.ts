import { Ctx } from "./Ctx"

export function tickVariableCounter(ctx: Ctx, name: string): number {
  const foundCounter = ctx.variableCounters.get(name)
  if (foundCounter === undefined) {
    ctx.variableCounters.set(name, 0)
    return 0
  } else {
    ctx.variableCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}
