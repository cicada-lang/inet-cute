import { Rule } from "../rule"
import { Mod } from "./Mod"

export function lookupRule(
  mod: Mod,
  start: string,
  end: string,
): Rule | undefined {
  return mod.rules.get(`${start} ${end}`)
}
