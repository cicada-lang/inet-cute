import { createChecking } from "../checking/createChecking"
import { collectWordsOutput } from "../compose/collectWordsOutput"
import { compose } from "../compose/compose"
// import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { freshenType } from "../freshen/freshenType"
import { Mod } from "../mod"
import { createPlaceholderOutputPortFromType } from "../placeholder/createPlaceholderOutputPortFromType"
import { Word } from "../word"

export function checkWords(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
  words: Array<Word>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)
  const occurredNames = new Map()

  const placeholderOutputPorts = collectWordsOutput(mod, env, input, {
    checking,
  })
    .reverse()
    .map((t) => freshenType(checking.typeVarCounters, t, occurredNames))
    .map((t) => createPlaceholderOutputPortFromType(mod, t))

  env.stack.push(...placeholderOutputPorts)

  for (const word of words) {
    compose(mod, env, word, {
      checking,
    })
  }

  for (const word of output) {
    //
  }
}
