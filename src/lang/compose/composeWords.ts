import { type Env } from "../env/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Word } from "../word/index.ts"
import { compose, type ComposeOptions } from "./compose.ts"

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
