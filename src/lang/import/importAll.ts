import { Mod } from "../mod"

export function importAll(mod: Mod, targetMod: Mod): void {
  for (const [name, definition] of targetMod.definitions) {
    if (definition.isPrivate) {
      continue
    }

    const found = mod.definitions.get(name)
    if (found !== undefined) {
      throw new Error(
        [
          `[importAll] I can not import already defined name.`,
          ``,
          `  name: ${name}`,
        ].join("\n"),
      )
    }

    mod.definitions.set(name, definition)
  }
}
