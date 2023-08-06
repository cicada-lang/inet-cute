import { Definition } from "../definition"
import { Mod } from "./Mod"

export function lookupDefinitionOrFail(mod: Mod, name: string): Definition {
  const definition = mod.definitions.get(name)
  if (definition === undefined) {
    throw new Error(
      [
        `[lookupDefinitionOrFail] I meet undefined name.`,
        ``,
        `  name: ${name}`,
      ].join("\n"),
    )
  }

  return definition
}
