import { Mod } from "../mod"
import { Net } from "../net"

export abstract class Def {
  abstract mod: Mod
  abstract name: string
  abstract refer(net: Net): void
}
