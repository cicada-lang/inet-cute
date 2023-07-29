import { Rule } from "../rule"
import { Mod } from "./Mod"

export function modLookupRule(
  mod: Mod,
  start: string,
  end: string,
): Rule | undefined {
  return mod.rules.get(`${start} ${end}`)
}
