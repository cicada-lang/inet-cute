import { type Mod } from "../mod/index.js"
import { type Net } from "../net/index.js"
import { type Value } from "../value/index.js"

export type Env = {
  mod: Mod
  net: Net
  stack: Array<Value>
  locals: Map<string, Value>
}
