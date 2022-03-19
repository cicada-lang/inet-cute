import { Action } from "../action"
import * as Defs from "../defs"
import { Edge } from "../edge"
import { InternalError } from "../errors"
import { Module } from "../module"
import { Node } from "../node"
import { Port } from "../port"
import { PrincipalType } from "../types"

export class Net {
  mod: Module
  nodes: Array<Node> = new Array()
  edges: Array<Edge> = new Array()
  actions: Array<Action> = new Array()
  portStack: Array<Port> = new Array()
  portStore: Map<string, Port> = new Map()

  constructor(mod: Module) {
    this.mod = mod
  }

  run(): void {
    const closer = this.closeFreePorts()
    while (this.actions.length > 0) this.step()
    this.cleanUpWires()
    this.releaseFreePorts(closer)
  }

  wires: Array<{ start: Port; end: Port }> = new Array()

  cleanUpWires(): void {
    for (const wire of this.wires) {
      if (wire.start.connection && wire.end.connection) {
        this.removeEdge(wire.start.connection.edge)
        this.removeEdge(wire.end.connection.edge)

        this.removeNode(wire.start.node)
        this.removeNode(wire.end.node)

        this.connect(wire.start.connection.port, wire.end.connection.port)
      }
    }

    this.wires = []
  }

  private closeFreePorts(): Node | undefined {
    if (this.portStack.length === 0) return undefined

    const name = "*free-ports-closer*"

    // NOTE Maintain the "one principal port" constraint.
    const inputTypes = this.portStack
      .map((port) => port.t)
      .map((t) => (t.isPrincipal() ? (t as PrincipalType).t : t))
      .reverse()

    inputTypes[0] = new PrincipalType(inputTypes[0])

    return new Defs.NodeDef(this.mod, name, inputTypes, []).refer(this)
  }

  private releaseFreePorts(closer: Node | undefined): void {
    if (closer === undefined) return

    for (const port of closer.input.reverse()) {
      if (port === undefined) return

      if (port.connection === undefined) {
        throw new InternalError("I expect port to have connection.")
      }

      this.portStack.push(port.connection.port)
      this.removeEdge(port.connection.edge)
    }

    this.removeNode(closer)
  }

  private step(): void {
    if (this.portStack.length !== 0) {
      throw new InternalError("I can not handle free port during stepping.")
    }

    const action = this.actions.pop()
    if (action === undefined) return
    else action.act(this.mod, this)
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
    if (index !== -1) {
      this.nodes.splice(index, 1)
    }
  }

  removeEdge(edge: Edge): void {
    const index = this.edges.indexOf(edge)
    if (index !== -1) {
      this.edges.splice(index, 1)
    }
  }
}
