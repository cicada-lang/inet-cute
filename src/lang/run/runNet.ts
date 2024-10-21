import { createEnv } from "../env/createEnv.js"
import { interact } from "../interact/index.js"
import { type Mod } from "../mod/index.js"
import { type Net } from "../net/index.js"

export function runNet(mod: Mod, net: Net): void {
  const env = createEnv(mod, { net })
  while (net.activeEdges.length > 0) {
    const activeEdge = net.activeEdges.pop()
    if (activeEdge !== undefined) {
      interact(env, activeEdge, {})
    }
  }
}
