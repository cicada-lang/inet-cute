import { createChecking } from "../checking/createChecking"
import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { refreshNode } from "../freshen/refreshNode"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { connectNodeWithPlaceholderPorts } from "../placeholder/connectNodeWithPlaceholderPorts"
import { Word } from "../word"

export function checkRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  const checking = createChecking()

  const first = createNodeFromDefinition(lookupDefinitionOrFail(mod, firstName))

  refreshNode(checking.typeVarCounters, first)

  const second = createNodeFromDefinition(
    lookupDefinitionOrFail(mod, secondName),
  )

  refreshNode(checking.typeVarCounters, second)

  const env = createEnv(mod)

  connectNodeWithPlaceholderPorts(mod, env, first)
  connectNodeWithPlaceholderPorts(mod, env, second)

  for (const word of words) {
    compose(mod, env, word, {
      current: { first, second },
      checking,
    })
  }
}
