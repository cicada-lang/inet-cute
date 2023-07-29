import { InternalError } from "../errors"
import { Net } from "./Net"
import { netCleanUpWires } from "./netCleanUpWires"
import { netCloseFreePorts } from "./netCloseFreePorts"
import { netReleaseFreePorts } from "./netReleaseFreePorts"

export function netRun(net: Net): void {
  const closer = netCloseFreePorts(net)

  while (net.actions.length > 0) {
    netStep(net)
  }

  netCleanUpWires(net)
  netReleaseFreePorts(net, closer)
}

function netStep(net: Net): void {
  if (net.portStack.length !== 0) {
    throw new InternalError("I can not handle free port during stepping.")
  }

  const action = net.actions.pop()
  if (action === undefined) {
    return
  } else {
    action.act(net.mod, net)
  }
}
