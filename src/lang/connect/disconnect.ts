import { Edge } from "../edge"
import { Net } from "../net"
import { deleteConnection } from "../net/deleteConnection"

export function disconnect(net: Net, edge: Edge): void {
  deleteConnection(net, edge.first)
  deleteConnection(net, edge.second)
}
