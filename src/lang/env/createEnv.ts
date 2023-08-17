import { Env } from "../env"
import { Mod } from "../mod"
import { Net } from "../net"
import { createNet } from "../net/createNet"

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
