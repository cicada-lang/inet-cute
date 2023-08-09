import { createChecking } from "../checking/createChecking"
// import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
// import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Word } from "../word"

export function checkRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  // const first = lookupDefinitionOrFail(mod, firstName)
  // const second = lookupDefinitionOrFail(mod, secondName)

  const env = createEnv(mod)
  const checking = createChecking()

  // for (const word of words) {
  //   compose(mod, env, word, {
  //     current: { first, second },
  //     checking,
  //   })
  // }
}
