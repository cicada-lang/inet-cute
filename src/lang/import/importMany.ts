import { type Mod } from "../mod/index.ts"
import { type ImportBinding } from "./ImportBinding.ts"
import { importOne } from "./importOne.ts"

export function importMany(
  mod: Mod,
  targetMod: Mod,
  bindings: Array<ImportBinding>,
): void {
  for (const binding of bindings) {
    importOne(mod, targetMod, binding)
  }
}
