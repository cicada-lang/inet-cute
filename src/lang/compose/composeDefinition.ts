import { arrayPopMany } from "../../utils/arrayPopMany"
import { checkTypeTermArgs } from "../check/checkTypeTermArgs"
import { Definition } from "../definition"
import { Env } from "../env"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { formatValue } from "../value/formatValue"
import { ComposeOptions } from "./compose"
import { composeNode } from "./composeNode"
import { composeWords } from "./composeWords"

export function composeDefinition(
  env: Env,
  definition: Definition,
  options: ComposeOptions,
): null {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      composeNode(env, createNodeFromDefinition(env.net, definition), options)
      return null
    }

    case "WordDefinition": {
      if (definition.words === undefined) {
        throw new Error(
          `[composeDefinition] I expect word definition to have defined words -- word: ${definition.name}`,
        )
      }

      composeWords(definition.mod, env, definition.words, options)
      return null
    }

    case "OperatorDefinition": {
      definition.compose(env, options)
      return null
    }

    case "TypeDefinition": {
      const args = arrayPopMany(env.stack, definition.inputArity)
      if (args.length < definition.inputArity) {
        throw new Error(
          [
            `[compose / TypeDefinition] I expect more value on the stack.`,
            ``,
            `  type term name: ${definition.name}`,
            `  type term arity: ${definition.inputArity}`,
            `  collected args: [${args
              .map((arg) => formatValue(env, arg))
              .join(", ")}]`,
          ].join("\n"),
        )
      }

      checkTypeTermArgs(env, args)

      env.stack.push({
        "@type": "Value",
        "@kind": "TypeTerm",
        name: definition.name,
        args,
      })

      return null
    }
  }
}
