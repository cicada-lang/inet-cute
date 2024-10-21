import { type Definition } from "../definition/index.js"
import { type Mod } from "./Mod.js"

export function findDefinitionOrFail(mod: Mod, name: string): Definition {
  const definition = mod.definitions.get(name)
  if (definition === undefined) {
    throw new Error(
      [
        `[findDefinitionOrFail] I meet undefined name.`,
        ``,
        `  name: ${name}`,
      ].join("\n"),
    )
  }

  return definition
}
