import { Rule } from "../rule"
import { Mod } from "./Mod"

export function lookupRule(
  mod: Mod,
  first: string,
  second: string,
): Rule | undefined {
  return mod.rules.get(`${first} ${second}`)
}
