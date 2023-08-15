import { Mod } from "../mod"
import { Net } from "../net"
import { Value } from "../value"

export type Env = {
  mod: Mod
  net: Net
  stack: Array<Value>
  locals: Map<string, Value>
}
