import { type Node } from "../node/index.ts"
import { type Sign } from "../sign/index.ts"
import { type Value } from "../value/index.ts"

export type Port = {
  "@type": "Value"
  "@kind": "Port"
  node: Node
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
}
