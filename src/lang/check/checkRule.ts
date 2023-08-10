import { createChecking } from "../checking/createChecking"
import { compose } from "../compose/compose"
import { connect } from "../connect/connect"
import { Env } from "../env"
import { createEnv } from "../env/createEnv"
import { refreshNode } from "../freshen/refreshNode"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Node } from "../node"
import { createNode } from "../node/createNode"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { Port } from "../port"
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

  connectPlaceholders(mod, env, first)
  connectPlaceholders(mod, env, second)

  for (const word of words) {
    compose(mod, env, word, {
      current: { first, second },
      checking,
    })
  }
}

function connectPlaceholders(mod: Mod, env: Env, node: Node): void {
  for (const port of node.input) {
    if (!port.isPrincipal) {
      const placeholderPort = createOutputPlaceholderPort(mod, port)
      connect(env, port, placeholderPort)
    }
  }

  for (const port of node.output) {
    if (!port.isPrincipal) {
      const placeholderPort = createInputPlaceholderPort(mod, port)
      connect(env, port, placeholderPort)
    }
  }
}

function createOutputPlaceholderPort(mod: Mod, port: Port): Port {
  const nodeName = `_output_placeholder_node_for_${port.name}_of_${port.node.name}`
  const portName = `_output_placeholder_port_for_${port.name}_of_${port.node.name}`
  const node = createNode(
    mod,
    nodeName,
    [],
    [{ name: portName, t: port.t, isPrincipal: true }],
  )

  return node.output[0]
}

function createInputPlaceholderPort(mod: Mod, port: Port): Port {
  const nodeName = `_input_placeholder_node_for_${port.name}_of_${port.node.name}`
  const portName = `_input_placeholder_port_for_${port.name}_of_${port.node.name}`
  const node = createNode(
    mod,
    nodeName,
    [{ name: portName, t: port.t, isPrincipal: true }],
    [],
  )

  return node.input[0]
}
