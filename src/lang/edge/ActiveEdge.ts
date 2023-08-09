import { Port } from "../port"
import { Rule } from "../rule"

export type ActiveEdge = {
  first: Port
  second: Port
  rule: Rule
}
