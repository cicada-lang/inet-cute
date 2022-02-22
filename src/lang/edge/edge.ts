import { Port } from "../port"
import { Rule } from "../rule"

export class Edge {
  start: Port
  end: Port

  constructor(start: Port, end: Port) {
    // TODO check port type.

    this.start = start
    this.end = end

    start.edge = this
    end.edge = this
  }
}

export class ActiveEdge extends Edge {
  rule: Rule

  constructor(start: Port, end: Port, rule: Rule) {
    super(start, end)
    this.rule = rule
  }
}
