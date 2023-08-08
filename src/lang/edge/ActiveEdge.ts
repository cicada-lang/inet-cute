import { Port } from "../port"
import { Rule } from "../rule"

export type ActiveEdge = {
  start: Port
  end: Port
  rule: Rule
}
