import { createEnv } from "../env/createEnv"
import { interact } from "../interact"
import { Mod } from "../mod"
import { Net } from "../net"

export function runNet(mod: Mod, net: Net): void {
  const env = createEnv(mod, { net })
  while (net.activeEdges.length > 0) {
    const activeEdge = net.activeEdges.pop()
    if (activeEdge !== undefined) {
      interact(env, activeEdge, {})
    }
  }
}
