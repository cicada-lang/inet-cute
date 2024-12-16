import { type Span } from "../span/index.ts"
import { type Definition } from "./Definition.ts"

export function definitionMaybeSpan(definition: Definition): Span | undefined {
  if (definition["@kind"] === "OperatorDefinition") {
    return undefined
  }

  return definition.span
}
