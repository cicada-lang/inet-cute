import { type NodeWithoutId } from "../node/index.js"
import { type Word } from "../word/index.js"
import { type Mod } from "./Mod.js"

export type RuleEntry = {
  name: string
  first: NodeWithoutId
  second: NodeWithoutId
  mod: Mod
  words: Array<Word>
}
