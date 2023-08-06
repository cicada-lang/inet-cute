import { Span } from "../span"
import { Definition } from "./Definition"

export function definitionMaybeSpan(definition: Definition): Span | undefined {
  if (definition.kind === "OperatorDefinition") {
    return undefined
  }

  return definition.span
}
