import * as Definitions from "../definition"
import { Net } from "../net"
import { Mod } from "./Mod"
import { define } from "./define"

export function defineOperator(
  mod: Mod,
  name: string,
  compose: (net: Net) => void,
): void {
  define(mod, name, Definitions.OperatorDefinition(mod, name, compose))
}
