import { Env } from "../env"
import { cleanUpWires } from "../env/cleanUpWires"
import { closeFreePorts } from "./closeFreePorts"
import { interact } from "./interact"
import { releaseFreePorts } from "./releaseFreePorts"

export function run(net: Env): void {
  const closer = closeFreePorts(net)

  while (net.activeEdges.length > 0) {
    step(net)
  }

  cleanUpWires(net)

  releaseFreePorts(net, closer)
}

function step(net: Env): void {
  const activeEdge = net.activeEdges.pop()
  if (activeEdge !== undefined) {
    interact(net.mod, net, activeEdge)
  }
}
