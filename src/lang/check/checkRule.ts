import { capNodeNonPrinciplePorts } from "../cap/capNodeNonPrinciplePorts.js"
import { createChecking } from "../checking/createChecking.js"
import { compose } from "../compose/compose.js"
import { createEnv } from "../env/createEnv.js"
import { refreshNode } from "../freshen/refreshNode.js"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail.js"
import { type Mod } from "../mod/index.js"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.js"
import { type Word } from "../word/index.js"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.js"

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
