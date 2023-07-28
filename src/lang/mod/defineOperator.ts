import * as Definitions from "../definitions"
import { Net } from "../graph"
import { Mod } from "./Mod"
import { define } from "./define"

export function defineOperator(
  mod: Mod,
  name: string,
  apply: (net: Net) => void,
): void {
  define(mod, name, new Definitions.OperatorDefinition(mod, name, apply))
}
