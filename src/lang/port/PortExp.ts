import { type Value } from "../value/index.ts"

export type PortExp = {
  "@type": "PortExp"
  name: string
  t: Value
  isPrincipal: boolean
}
