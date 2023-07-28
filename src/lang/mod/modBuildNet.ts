import { Net } from "../graph"
import { createNet } from "../graph/createNet"
import { netCleanUpWires } from "../graph/netCleanUpWires"
import { Mod } from "./Mod"

export function modBuildNet(mod: Mod, name: string): Net {
  const net = createNet(mod)
  mod.lookupNetDefinitionOrFail(name).meaning(net)
  netCleanUpWires(net)
  return net
}
