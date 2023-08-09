import { Value } from "../value"

export type Checking = {
  substitution: Map<string, Value>
  typeVarCounters: Map<string, number>
}
