import { createChecking } from "../checking/createChecking"
import { collectWords } from "../compose/collectWords"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { Word } from "../word"

export function checkType(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)

  const inputValues = collectWords(mod, env, input, { checking })
  const outputValues = collectWords(mod, env, output, { checking })
}
