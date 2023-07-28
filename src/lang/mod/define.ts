import { Definition } from "../definition"
import { Mod } from "./Mod"

export function define(mod: Mod, name: string, definition: Definition): void {
  mod.definitions.set(name, definition)
}
