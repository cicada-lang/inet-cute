import { capNodeNonPrinciplePorts } from "../cap/index.js"
import { compose } from "../compose/compose.js"
import { connect } from "../connect/connect.js"
import { createEnv } from "../env/createEnv.js"
import { findRuleByName } from "../mod/findRuleByName.js"
import { findDefinitionOrFail, type Mod } from "../mod/index.js"
import { deleteNodeEntry } from "../net/deleteNodeEntry.js"
import { findPrincipalPort } from "../net/findPrincipalPort.js"
import { copyConnectedComponent, createNet, type Net } from "../net/index.js"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.js"
import { type Node } from "../node/index.js"

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
