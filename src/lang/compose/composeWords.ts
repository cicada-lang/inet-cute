import { type Env } from "../env/index.js"
import { type Mod } from "../mod/index.js"
import { type Word } from "../word/index.js"
import { compose, type ComposeOptions } from "./compose.js"

export function composeWords(
  mod: Mod,
  env: Env,
  words: Array<Word>,
  options: ComposeOptions,
): void {
  for (const word of words) {
    compose(mod, env, word, options)
  }
}
