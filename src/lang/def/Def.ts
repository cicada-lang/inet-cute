import { Net } from "../graph"
import { Mod } from "../mod"

export abstract class Def {
  abstract mod: Mod
  abstract name: string
  abstract meaning(net: Net): void
}
