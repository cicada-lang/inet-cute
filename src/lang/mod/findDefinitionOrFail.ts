import { type Definition } from "../definition/index.ts"
import { type Mod } from "./Mod.ts"

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
