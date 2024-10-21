import { type Mod } from "../mod/index.js"
import { type Word } from "../word/index.js"

export type Rule = {
  mod: Mod
  words: Array<Word>
}
