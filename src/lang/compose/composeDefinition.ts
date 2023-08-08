import { Definition } from "../definition"
import { Env } from "../env"
import { ComposeOptions } from "./compose"
import { composeNodeDefinition } from "./composeNodeDefinition"
import { composeWords } from "./composeWords"

export function composeDefinition(
  env: Env,
  definition: Definition,
  options: ComposeOptions,
): void {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      composeNodeDefinition(env, definition)
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
      throw new Error(
        `[composeDefinition] Can not compose a type: ${definition.name}`,
      )
    }
  }
}
