import { Mod } from "../mod"
import { ImportBinding } from "./ImportBinding"
import { importOne } from "./importOne"

export function importMany(
  mod: Mod,
  targetMod: Mod,
  bindings: Array<ImportBinding>,
): void {
  for (const binding of bindings) {
    importOne(mod, targetMod, binding)
  }
}
