import { Mod } from "../mod"
import { Net } from "../net"

export interface Definition {
  mod: Mod
  name: string
  call(net: Net): void
}
