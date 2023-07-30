import { InternalError } from "../errors"
import { Net } from "./Net"
import { cleanUpWires } from "./cleanUpWires"
import { closeFreePorts } from "./closeFreePorts"
import { interact } from "./interact"
import { releaseFreePorts } from "./releaseFreePorts"

export function run(net: Net): void {
  const closer = closeFreePorts(net)

  while (net.activeEdges.length > 0) {
    step(net)
  }

  cleanUpWires(net)
  releaseFreePorts(net, closer)
}

function step(net: Net): void {
  if (net.portStack.length !== 0) {
    throw new InternalError("I can not handle free port during stepping.")
  }

  const activeEdge = net.activeEdges.pop()
  if (activeEdge !== undefined) {
    interact(net.mod, net, activeEdge)
  }
}
