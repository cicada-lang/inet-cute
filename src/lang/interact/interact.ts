import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { ActiveEdge } from "../edge"
import { Env } from "../env"
import { deleteNodePorts } from "../net/deleteNodePorts"
import { removeEdgesOfNode } from "../net/removeEdgesOfNode"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: ActiveEdge,
  options: InteractOptions,
): void {
  removeEdgesOfNode(env.net, activeEdge.first.node)
  removeEdgesOfNode(env.net, activeEdge.second.node)

  for (const word of activeEdge.rule.words) {
    compose(activeEdge.rule.mod, env, word, {
      current: {
        first: activeEdge.first.node,
        second: activeEdge.second.node,
      },
      checking: options.checking,
    })
  }

  deleteNodePorts(env.net, activeEdge.first.node)
  deleteNodePorts(env.net, activeEdge.second.node)
}
