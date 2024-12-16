import { capNodeNonPrinciplePorts } from "../cap/capNodeNonPrinciplePorts.ts"
import { createChecking } from "../checking/createChecking.ts"
import { compose } from "../compose/compose.ts"
import { createEnv } from "../env/createEnv.ts"
import { refreshNode } from "../freshen/refreshNode.ts"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail.ts"
import { type Mod } from "../mod/index.ts"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.ts"
import { type Word } from "../word/index.ts"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.ts"

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
