import { Net } from "../graph"
import { createNet } from "../graph/createNet"
import { netCleanUpWires } from "../graph/netCleanUpWires"
import { Mod } from "./Mod"
import { modLookupNetDefinitionOrFail } from "./modLookupNetDefinitionOrFail"

export function modBuildNet(mod: Mod, name: string): Net {
  const net = createNet(mod)
  modLookupNetDefinitionOrFail(mod, name).meaning(net)
  netCleanUpWires(net)
  return net
}
