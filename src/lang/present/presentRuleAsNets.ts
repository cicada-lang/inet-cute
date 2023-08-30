import { capNode } from "../cap"
import { compose } from "../compose/compose"
import { connect } from "../connect/connect"
import { createEnv } from "../env/createEnv"
import { Mod, lookupDefinitionOrFail } from "../mod"
import { lookupRuleByName } from "../mod/lookupRuleByName"
import { Net, copyConnectedComponent, createNet } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findPrincipalPort } from "../net/findPrincipalPort"
import { Node } from "../node"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"

export function presentRuleAsNets(mod: Mod, ruleName: string): [Net, Net] {
  const env = createEnv(mod)

  const rule = lookupRuleByName(mod, ruleName)
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
    lookupDefinitionOrFail(mod, firstName),
  )

  const second = createNodeFromDefinition(
    env.net,
    lookupDefinitionOrFail(mod, secondName),
  )

  capNode(mod, env.net, first)
  capNode(mod, env.net, second)

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
  const firstConnectedPort = disconnectPort(initial, firstPrincipalPort)
  if (firstConnectedPort) {
    deleteNodeEntry(initial, firstConnectedPort.node)
  }

  const secondPrincipalPort = findPrincipalPort(initial, second)
  const secondConnectedPort = disconnectPort(initial, secondPrincipalPort)
  if (secondConnectedPort) {
    deleteNodeEntry(initial, secondConnectedPort.node)
  }

  connect(initial, firstPrincipalPort, secondPrincipalPort)

  return initial
}
