import { arrayPopMany } from "../../utils/arrayPopMany.js"
import { checkTypeTermArgs } from "../check/checkTypeTermArgs.js"
import { type Definition } from "../definition/index.js"
import { type Env } from "../env/index.js"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.js"
import { formatValue } from "../value/formatValue.js"
import { type ComposeOptions } from "./compose.js"
import { composeNode } from "./composeNode.js"
import { composeWords } from "./composeWords.js"

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
            `  collected args: [${args.map(formatValue).join(", ")}]`,
          ].join("\n"),
        )
      }

      checkTypeTermArgs(args)

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
