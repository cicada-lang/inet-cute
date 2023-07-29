import { Port } from "../graph"
import { Rule } from "../rule"

export class ActiveEdge {
  constructor(
    public start: Port,
    public end: Port,
    public rule: Rule,
  ) {}
}
