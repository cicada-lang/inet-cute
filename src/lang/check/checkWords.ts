import { createChecking } from "../checking/createChecking"
import { collectWords } from "../compose/collectWords"
import { compose } from "../compose/compose"
import { createEnv } from "../env/createEnv"
import { freshenType } from "../freshen/freshenType"
import { Mod } from "../mod"
import { createPlaceholderOutputPortFromType } from "../placeholder/createPlaceholderOutputPortFromType"
import { unifyTypes } from "../unify/unifyTypes"
import { formatValue } from "../value/formatValue"
import { Word } from "../word"

export function checkWords(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
  words: Array<Word>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)
  const occurredNames = new Map()

  const inputValues = collectWords(mod, env, input, {
    checking,
  }).map((t) => freshenType(checking.typeVarCounters, t, occurredNames))

  const placeholderOutputPorts = inputValues
    .reverse()
    .map((t) => createPlaceholderOutputPortFromType(env.net, mod, t))

  env.stack.push(...placeholderOutputPorts)

  for (const word of words) {
    compose(mod, env, word, {
      checking,
    })
  }

  const outputValues = collectWords(mod, env, output, {
    checking,
  }).map((t) => freshenType(checking.typeVarCounters, t, occurredNames))

  for (const t of [...outputValues].reverse()) {
    const value = env.stack.pop()
    if (value === undefined) {
      throw new Error(`[checkWords] I expect a value on top of the stack.`)
    }

    if (value["@kind"] !== "Port") {
      throw new Error(
        [
          `[checkWords] I expect the top value on the stack to be a Port.`,
          ``,
          `  value['@kind']: ${value["@kind"]}`,
        ].join("\n"),
      )
    }

    unifyTypes(checking.substitution, value.t, t)
  }

  if (env.stack.length !== 0) {
    throw new Error(
      [
        `[checkWords] I expect the stack to be empty after checking.`,
        ``,
        `  stack length: ${env.stack.length}`,
        `  stack: [${env.stack.map(formatValue).join(", ")}]`,
        ``,
        `  Maybe this is due to extra input arity,`,
        `  or lack of output arity.`,
      ].join("\n"),
    )
  }
}
