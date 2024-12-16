import { type Mod } from "../mod/index.ts"
import { type Word } from "../word/index.ts"

export type Rule = {
  mod: Mod
  words: Array<Word>
}
