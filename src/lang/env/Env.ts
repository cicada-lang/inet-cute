import { type Mod } from "../mod/index.ts"
import { type Net } from "../net/index.ts"
import { type Value } from "../value/index.ts"

export type Env = {
  mod: Mod
  net: Net
  stack: Array<Value>
  locals: Map<string, Value>
}
