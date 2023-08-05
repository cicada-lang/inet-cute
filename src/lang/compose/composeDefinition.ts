import { Definition } from "../definition"
import { Net } from "../net"
import { ComposeOptions } from "./compose"
import { composeNodeDefinition } from "./composeNodeDefinition"
import { composeWords } from "./composeWords"

export function composeDefinition(
  net: Net,
  definition: Definition,
  options: ComposeOptions,
): void {
  switch (definition.kind) {
    case "NodeDefinition": {
      composeNodeDefinition(net, definition)
      return
    }

    case "WordDefinition": {
      if (definition.definedWords === undefined) {
        throw new Error(
          `[composeDefinition] I expect word definition to have defined words -- word: ${definition.name}`,
        )
      }

      composeWords(definition.mod, net, definition.definedWords, options)
      return
    }

    case "OperatorDefinition": {
      definition.compose(net)
      return
    }

    case "TypeDefinition": {
      throw new Error(
        `[composeDefinition] Can not compose a type: ${definition.name}`,
      )
    }
  }
}
