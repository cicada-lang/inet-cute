import { type Value } from "../value/index.js"

export type PortExp = {
  "@type": "PortExp"
  name: string
  t: Value
  isPrincipal: boolean
}
