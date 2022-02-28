import * as Defs from "../definitions"
import { Action, Edge } from "../edge"
import * as Errors from "../errors"
import { Module } from "../module"
import { Node } from "../node"
import { Port } from "../port"
import { PrincipalType } from "../type"

export class Net {
  mod: Module
  nodes: Array<Node> = new Array()
  edges: Array<Edge> = new Array()
  actions: Array<Action> = new Array()
  // NOTE We use `ports` as a stack to build the net.
  ports: Array<Port> = new Array()

  constructor(mod: Module) {
    this.mod = mod
  }

  run(): void {
    const closer = this.closeFreePorts()
    while (this.actions.length > 0) this.step()
    this.releaseFreePorts(closer)
  }

  private closeFreePorts(): Node | undefined {
    if (this.ports.length === 0) return undefined

    const name = "*free-ports-closer*"

    // NOTE Maintain the "one principal port" constraint.
    const inputTypes = this.ports
      .map((port) => port.t)
      .map((t) => (t.isPrincipal() ? (t as PrincipalType).t : t))
      .reverse()

    inputTypes[0] = new PrincipalType(inputTypes[0])

    return new Defs.NodeDefinition(this.mod, name, inputTypes, []).apply(this)
  }

  private releaseFreePorts(closer: Node | undefined): void {
    if (closer === undefined) return

    for (const port of closer.input.reverse()) {
      if (port === undefined) return

      if (port.connection === undefined) {
        throw new Errors.InternalError("I expect port to have connection.")
      }

      this.ports.push(port.connection.port)
      this.removeEdge(port.connection.edge)
    }

    this.removeNode(closer)
  }

  private step(): void {
    if (this.ports.length !== 0) {
      throw new Errors.InternalError(
        "I can not handle free port during stepping."
      )
    }

    const action = this.actions.pop()
    if (action === undefined) return
    else action.act(this)
  }

  connect(start: Port, end: Port): void {
    const rule = this.mod.getRuleByPorts(start, end)

    if (rule) {
      this.actions.push(new Action(start, end, rule))
    } else {
      this.edges.push(new Edge(start, end))
    }
  }

  removeNode(node: Node): void {
    const index = this.nodes.indexOf(node)
    if (index > -1) {
      this.nodes.splice(index, 1)
    }
  }

  removeEdge(edge: Edge): void {
    const index = this.edges.indexOf(edge)
    if (index > -1) {
      this.edges.splice(index, 1)
    }
  }
}
