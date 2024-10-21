import { type Node } from "../node/index.js"
import { type Sign } from "../sign/index.js"
import { type Value } from "../value/index.js"

export type Port = {
  "@type": "Value"
  "@kind": "Port"
  node: Node
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
}
