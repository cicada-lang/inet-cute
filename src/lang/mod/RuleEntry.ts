import { NodeWithoutId } from "../node"
import { Word } from "../word"
import { Mod } from "./Mod"

export type RuleEntry = {
  name: string
  first: NodeWithoutId
  second: NodeWithoutId
  mod: Mod
  words: Array<Word>
}
