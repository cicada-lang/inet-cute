import { type NodeWithoutId } from "../node/index.ts"
import { type Word } from "../word/index.ts"
import { type Mod } from "./Mod.ts"

export type RuleEntry = {
  name: string
  first: NodeWithoutId
  second: NodeWithoutId
  mod: Mod
  words: Array<Word>
}
