import { createChecking } from "../checking/createChecking"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { Word } from "../word"

export function checkRule(
  mod: Mod,
  first: string,
  second: string,
  words: Array<Word>,
): void {
  const env = createEnv(mod)
  const checking = createChecking()

  // for (const word of activeEdge.rule.words) {
  //   compose(mod, env, word, {
  //     current: {
  //       start: activeEdge.start.node,
  //       end: activeEdge.end.node,
  //     },
  //   })
  // }
}
