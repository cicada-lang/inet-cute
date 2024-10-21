import { type Env } from "../env/index.js"
import { type Mod } from "../mod/index.js"
import { createNet } from "../net/createNet.js"
import { type Net } from "../net/index.js"

export function createEnv(
  mod: Mod,
  options?: {
    net?: Net
  },
): Env {
  return {
    mod,
    net: options?.net || createNet(),
    stack: [],
    locals: new Map(),
  }
}
