import { Env } from "../env"
import { Mod } from "../mod"
import { tightenWires } from "../wire/tightenWires"
import { Word } from "../word"
import { ComposeOptions, compose } from "./compose"

export function composeWords(
  mod: Mod,
  env: Env,
  words: Array<Word>,
  options: ComposeOptions,
): void {
  for (const word of words) {
    compose(mod, env, word, options)
  }

  tightenWires(env)
}
