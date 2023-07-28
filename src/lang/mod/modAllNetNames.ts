import * as Definitions from "../definitions"
import { Mod } from "./Mod"

export function modAllNetNames(mod: Mod): Array<string> {
  return Array.from(mod.definitions.values())
    .filter((definition) => definition instanceof Definitions.NetDefinition)
    .map((definition) => definition.name)
}
