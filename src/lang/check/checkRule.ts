import { capNodeNonPrinciplePorts } from "../cap/capNodeNonPrinciplePorts"
import { createChecking } from "../checking/createChecking"
import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { refreshNode } from "../freshen/refreshNode"
import { Mod } from "../mod"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail"
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
    findDefinitionOrFail(mod, firstName),
  )

  refreshNode(env.net, checking.typeVarCounters, first)

  const second = createNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, secondName),
  )

  refreshNode(env.net, checking.typeVarCounters, second)

  capNodeNonPrinciplePorts(mod, env.net, first)
  capNodeNonPrinciplePorts(mod, env.net, second)

  for (const word of words) {
    compose(mod, env, word, {
      current: { first, second },
      checking,
    })
  }

  checkAllLocalsAreUsed(env.locals)
}
