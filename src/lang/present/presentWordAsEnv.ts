import { capType } from "../cap"
import { collectWords } from "../compose/collectWords"
import { compose } from "../compose/compose"
import { Env } from "../env"
import { createEnv } from "../env/createEnv"
import { Mod, lookupDefinitionOrFail } from "../mod"
import { formatWord } from "../word"

export function presentWordAsEnv(mod: Mod, name: string): Env {
  const definition = lookupDefinitionOrFail(mod, name)

  if (definition["@kind"] !== "WordDefinition") {
    throw new Error(
      [
        `[presentWordAsEnv] I expect to find a WordDefinition from the name.`,
        ``,
        `  name: ${name}`,
        `  definition kind: ${definition["@kind"]}`,
      ].join("\n"),
    )
  }

  const { input, output, words } = definition

  if (words === undefined) {
    throw new Error(
      [
        `[presentWordAsEnv] I expect the word to be not only claimed but also defined.`,
        ``,
        `  name: ${name}`,
        `  input: ${input.map(formatWord).join(" ")}`,
        `  output: ${output.map(formatWord).join(" ")}`,
      ].join("\n"),
    )
  }

  const env = createEnv(mod)

  const inputValues = collectWords(mod, env, input, {})

  const capOutputPorts = inputValues
    .reverse()
    .map((t) => capType(mod, env.net, t))

  env.stack.push(...capOutputPorts)

  for (const word of words) {
    compose(mod, env, word, {})
  }

  return env
}
