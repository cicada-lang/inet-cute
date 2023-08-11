import { Env } from "../env"
import { Mod } from "../mod"
import { Value } from "../value"
import { Word } from "../word"
import { ComposeOptions } from "./compose"
import { composeWords } from "./composeWords"

export function collectWords(
  mod: Mod,
  env: Env,
  words: Array<Word>,
  options: ComposeOptions,
): Array<Value> {
  const length = env.stack.length
  composeWords(mod, env, words, options)
  const values = env.stack.slice(length)
  env.stack = env.stack.slice(0, length)
  return values
}
