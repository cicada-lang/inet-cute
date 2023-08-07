import { Env } from "../env"
import { cleanUpWires } from "../env/cleanUpWires"
import { closeFreePorts } from "./closeFreePorts"
import { interact } from "./interact"
import { releaseFreePorts } from "./releaseFreePorts"

export function run(env: Env): void {
  const closer = closeFreePorts(env)

  while (env.activeEdges.length > 0) {
    step(env)
  }

  cleanUpWires(env)

  releaseFreePorts(env, closer)
}

function step(env: Env): void {
  const activeEdge = env.activeEdges.pop()
  if (activeEdge !== undefined) {
    interact(env.mod, env, activeEdge)
  }
}
