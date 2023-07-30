import { Net } from "../graph"
import { cleanUpWires } from "../graph/cleanUpWires"
import { createNet } from "../graph/createNet"
import { Mod } from "./Mod"
import { lookupNetDefinitionOrFail } from "./lookupNetDefinitionOrFail"

export function modBuildNet(mod: Mod, name: string): Net {
  const net = createNet(mod)
  lookupNetDefinitionOrFail(mod, name).meaning(net)
  cleanUpWires(net)
  return net
}
