import { type Span } from "../span/index.js"
import { type Definition } from "./Definition.js"

export function definitionMaybeSpan(definition: Definition): Span | undefined {
  if (definition["@kind"] === "OperatorDefinition") {
    return undefined
  }

  return definition.span
}
