import { Definition } from "../definition"
import { Rule } from "../rule"

export type Mod = {
  url: URL
  text: string
  definitions: Map<string, Definition>
  rules: Map<string, Rule>
  nodeCounters: Map<string, number>
}
