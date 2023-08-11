import { createChecking } from "../checking/createChecking"
import { compose } from "../compose/compose"
import { composeWords } from "../compose/composeWords"
// import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
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

  let length = env.stack.length
  composeWords(mod, env, input, { checking })
  const collectedFromInput = env.stack.slice(length)

  env.stack = env.stack.slice(0, length)

  const placeholderOutputPorts = collectedFromInput
    .reverse()
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
