import { type Env } from "../env/index.ts"
import { type Mod } from "../mod/index.ts"
import { createNet } from "../net/createNet.ts"
import { type Net } from "../net/index.ts"

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
