import { Env } from "../env"
import { Mod } from "../mod"
import { createNet } from "../net/createNet"

export function createEnv(mod: Mod): Env {
  return {
    mod,
    net: createNet(),
    stack: [],
    locals: new Map(),
  }
}
