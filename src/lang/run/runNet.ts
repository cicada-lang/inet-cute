import { createEnv } from "../env/createEnv.ts"
import { interact } from "../interact/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Net } from "../net/index.ts"

export function runNet(mod: Mod, net: Net): void {
  const env = createEnv(mod, { net })
  while (net.activeEdges.length > 0) {
    const activeEdge = net.activeEdges.pop()
    if (activeEdge !== undefined) {
      interact(env, activeEdge, {})
    }
  }
}
