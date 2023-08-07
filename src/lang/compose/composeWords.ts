import { Env } from "../env"
import { cleanUpWires } from "../env/cleanUpWires"
import { Mod } from "../mod"
import { Word } from "../word"
import { ComposeOptions, compose } from "./compose"

export function composeWords(
  mod: Mod,
  net: Env,
  words: Array<Word>,
  options: ComposeOptions,
): void {
  for (const word of words) {
    compose(mod, net, word, options)
  }

  cleanUpWires(net)
}
