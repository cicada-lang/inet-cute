import { Word } from "../word"
import { Mod } from "./Mod"

export function defineRule(
  mod: Mod,
  first: string,
  second: string,
  words: Array<Word>,
): void {
  mod.rules.set(`${first} ${second}`, { words })
}
