import { Word } from "../word"
import { Mod } from "./Mod"

export type RuleEntry = {
  name: string
  mod: Mod
  words: Array<Word>
}
