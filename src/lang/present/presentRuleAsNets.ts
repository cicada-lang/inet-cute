import { capNodeNonPrinciplePorts } from "../cap/index.ts"
import { compose } from "../compose/compose.ts"
import { connect } from "../connect/connect.ts"
import { createEnv } from "../env/createEnv.ts"
import { findRuleByName } from "../mod/findRuleByName.ts"
import { findDefinitionOrFail, type Mod } from "../mod/index.ts"
import { deleteNodeEntry } from "../net/deleteNodeEntry.ts"
import { findPrincipalPort } from "../net/findPrincipalPort.ts"
import { copyConnectedComponent, createNet, type Net } from "../net/index.ts"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.ts"
import { type Node } from "../node/index.ts"

export function presentRuleAsNets(mod: Mod, ruleName: string): [Net, Net] {
  const env = createEnv(mod)

  const rule = findRuleByName(mod, ruleName)
  if (rule === undefined) {
    throw new Error(
      [
        `[presentRuleAsNets] I meet undefined rule.`,
        ``,
        `  ruleName: ${ruleName}`,
      ].join("\n"),
    )
  }

  const [firstName, secondName] = ruleName.split(" ")

  const first = createNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, firstName),
  )

  const second = createNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, secondName),
  )

  capNodeNonPrinciplePorts(mod, env.net, first)
  capNodeNonPrinciplePorts(mod, env.net, second)

  const initial = collectInitialNet(env.net, first, second)

  for (const word of rule.words) {
    compose(mod, env, word, {
      current: { first, second },
    })
  }

  deleteNodeEntry(env.net, first)
  deleteNodeEntry(env.net, second)

  const final = env.net

  return [initial, final]
}

function collectInitialNet(net: Net, first: Node, second: Node): Net {
  const initial = createNet()

  copyConnectedComponent(net, initial, first)
  copyConnectedComponent(net, initial, second)

  const firstPrincipalPort = findPrincipalPort(initial, first)
  const secondPrincipalPort = findPrincipalPort(initial, second)

  connect(initial, firstPrincipalPort, secondPrincipalPort)

  return initial
}
