import { capNode } from "../cap/capNode"
import { createChecking } from "../checking/createChecking"
import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { refreshNode } from "../freshen/refreshNode"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { Word } from "../word"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed"

export function checkRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  const checking = createChecking()

  const env = createEnv(mod)

  const first = createNodeFromDefinition(
    env.net,
    lookupDefinitionOrFail(mod, firstName),
  )

  refreshNode(env.net, checking.typeVarCounters, first)

  const second = createNodeFromDefinition(
    env.net,
    lookupDefinitionOrFail(mod, secondName),
  )

  refreshNode(env.net, checking.typeVarCounters, second)

  capNode(mod, env.net, first)
  capNode(mod, env.net, second)

  for (const word of words) {
    compose(mod, env, word, {
      current: { first, second },
      checking,
    })
  }

  checkAllLocalsAreUsed(env.locals)
}
