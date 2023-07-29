import { Net } from "../graph"
import { createNet } from "../graph/createNet"
import { netCleanUpWires } from "../graph/netCleanUpWires"
import { Mod } from "./Mod"
import { lookupNetDefinitionOrFail } from "./lookupNetDefinitionOrFail"

export function modBuildNet(mod: Mod, name: string): Net {
  const net = createNet(mod)
  lookupNetDefinitionOrFail(mod, name).meaning(net)
  netCleanUpWires(net)
  return net
}
