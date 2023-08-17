import { composeNode } from "../compose/composeNode"
import { Env } from "../env"
import { addNode } from "../net/addNode"
import { Node } from "../node"
import { Port } from "../port"
import { PortExp } from "../port/PortExp"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(env: Env): Node | undefined {
  if (env.stack.length === 0) {
    return undefined
  }

  // const placeholderPorts: Array<Port> = []
  // for (const nodeEntry of env.net.nodeEntries.values()) {
  //   for (const portEntry of Object.values(nodeEntry.ports)) {
  //     if (portEntry.connection === undefined) {
  //       switch (portEntry.sign) {
  //         case 1: {
  //           placeholderPorts.push(
  //             connectPlaceholderInputPort(
  //               env.mod,
  //               env.net,
  //               createPortFromPortEntry(portEntry),
  //             ),
  //           )
  //         }
  //         case -1: {
  //           placeholderPorts.push(
  //             connectPlaceholderOutputPort(env.mod, env.net, port),
  //           )
  //         }
  //       }
  //     }
  //   }
  // }

  const ports = env.stack
    .filter((value): value is Port => value["@kind"] === "Port")
    .map<PortExp>((port) => ({
      "@type": "PortExp",
      name: `_temporary_closing_port_for_${port.name}_of_${port.node.name}`,
      t: port.t,
      isPrincipal: false,
    }))

  const node = addNode(env.net, env.mod, "_temporary_closing_node", ports, [])

  return composeNode(env, node, {})
}
