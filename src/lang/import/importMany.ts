import { type Mod } from "../mod/index.js"
import { type ImportBinding } from "./ImportBinding.js"
import { importOne } from "./importOne.js"

export function importMany(
  mod: Mod,
  targetMod: Mod,
  bindings: Array<ImportBinding>,
): void {
  for (const binding of bindings) {
    importOne(mod, targetMod, binding)
  }
}
