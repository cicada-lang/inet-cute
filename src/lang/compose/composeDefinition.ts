import { Definition } from "../definition"
import { Net } from "../net"
import { composeNodeDefinition } from "./composeNodeDefinition"
import { composeWords } from "./composeWords"

export function composeDefinition(net: Net, definition: Definition): void {
  switch (definition.kind) {
    case "NodeDefinition": {
      composeNodeDefinition(net, definition)
      return
    }

    case "NetDefinition": {
      composeWords(definition.mod, net, definition.words)
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
