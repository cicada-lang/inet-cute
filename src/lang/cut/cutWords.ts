import { Ctx } from "../ctx"
import { Mod } from "../mod"
import { Word } from "../word"
import { CutOptions, cut } from "./cut"

export function cutWords(
  mod: Mod,
  ctx: Ctx,
  words: Array<Word>,
  options?: CutOptions,
): void {
  for (const word of words) {
    cut(mod, ctx, word, options)
  }
}
