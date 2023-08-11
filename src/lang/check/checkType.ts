import { createChecking } from "../checking/createChecking"
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

  // collectWordsOutput(mod, env, output, input)
}
