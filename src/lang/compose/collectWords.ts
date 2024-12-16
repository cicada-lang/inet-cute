import { type Env } from "../env/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Value } from "../value/index.ts"
import { type Word } from "../word/index.ts"
import { type ComposeOptions } from "./compose.ts"
import { composeWords } from "./composeWords.ts"

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
