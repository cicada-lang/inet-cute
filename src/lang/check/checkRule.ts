import { createChecking } from "../checking/createChecking"
import { Env } from "../env"
// import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Node } from "../node"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { Word } from "../word"

export function checkRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  const checking = createChecking()

  const first = createNodeFromDefinition(lookupDefinitionOrFail(mod, firstName))

  const second = createNodeFromDefinition(
    lookupDefinitionOrFail(mod, secondName),
  )

  const env = createEnv(mod)

  connectPlaceholders(mod, env, first)
  connectPlaceholders(mod, env, second)

  for (const word of words) {
    // compose(mod, env, word, {
    //   current: { first, second },
    //   checking,
    // })
  }
}

function connectPlaceholders(mod: Mod, env: Env, node: Node): void {
  for (const port of node.input) {
    if (!port.isPrincipal) {
      //
      // createOutputPlaceholder(mod, port.t )
    }
  }

  for (const port of node.output) {
    if (!port.isPrincipal) {
      // createInputPlaceholder(mod, port.t )
    }
  }
}
