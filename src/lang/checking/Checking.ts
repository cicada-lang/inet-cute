import { type Value } from "../value/index.ts"

export type Checking = {
  substitution: Map<string, Value>
  typeVarCounters: Map<string, number>
}
