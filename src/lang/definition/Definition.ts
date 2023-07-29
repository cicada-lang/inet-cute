import { Net } from "../graph"
import { Mod } from "../mod"

export interface Definition {
  mod: Mod
  name: string
  meaning(net: Net): void
}
