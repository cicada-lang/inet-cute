import { type Value } from "../value/index.js"

export type Checking = {
  substitution: Map<string, Value>
  typeVarCounters: Map<string, number>
}
