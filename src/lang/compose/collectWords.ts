import { type Env } from "../env/index.js"
import { type Mod } from "../mod/index.js"
import { type Value } from "../value/index.js"
import { type Word } from "../word/index.js"
import { type ComposeOptions } from "./compose.js"
import { composeWords } from "./composeWords.js"

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
