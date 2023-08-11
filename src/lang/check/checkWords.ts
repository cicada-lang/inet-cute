import { createChecking } from "../checking/createChecking"
// import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { Word } from "../word"

export function checkWords(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
  words: Array<Word>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)

  for (const word of input) {
    // compose(mod, env, word, {
    //   checking,
    // })
  }

  for (const word of words) {
    // compose(mod, env, word, {
    //   checking,
    // })
  }

  for (const word of output) {
    //
  }
}
