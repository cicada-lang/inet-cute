import { Definition } from "../definition"
import { Rule } from "../rule"

export type Mod = {
  url: URL
  definitions: Map<string, Definition>
  rules: Map<string, Rule>
  nodeCounter: number
}
