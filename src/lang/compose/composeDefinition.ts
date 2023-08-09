import { Definition } from "../definition"
import { Env } from "../env"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { Value } from "../value"
import { formatValue } from "../value/formatValue"
import { ComposeOptions } from "./compose"
import { composeNode } from "./composeNode"
import { composeWords } from "./composeWords"

export function composeDefinition(
  env: Env,
  definition: Definition,
  options: ComposeOptions,
): void {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      composeNode(env, createNodeFromDefinition(definition), options)
      return
    }

    case "WordDefinition": {
      if (definition.words === undefined) {
        throw new Error(
          `[composeDefinition] I expect word definition to have defined words -- word: ${definition.name}`,
        )
      }

      composeWords(definition.mod, env, definition.words, options)
      return
    }

    case "OperatorDefinition": {
      definition.compose(env)
      return
    }

    case "TypeDefinition": {
      let count = 0
      const args: Array<Value> = []
      while (count < definition.arity) {
        const value = env.stack.pop()
        if (value === undefined) {
          throw new Error(
            [
              `[compose / TypeDefinition] I expect more value on the stack.`,
              ``,
              `  type term name: ${definition.name}`,
              `  type term arity: ${definition.arity}`,
              `  collected args: [${args.map(formatValue).join(", ")}]`,
            ].join("\n"),
          )
        }

        args.push(value)
        count++
      }

      env.stack.push({
        "@type": "Value",
        "@kind": "TypeTerm",
        name: definition.name,
        args,
      })

      return
    }
  }
}
