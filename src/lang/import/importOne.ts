import { type Mod } from "../mod/index.ts"
import { type ImportBinding } from "./ImportBinding.ts"
import { importNodeRules } from "./importNodeRules.ts"

export function importOne(
  mod: Mod,
  targetMod: Mod,
  binding: ImportBinding,
): void {
  const { name } = binding

  const found = mod.definitions.get(name)
  if (found !== undefined) {
    throw new Error(
      [
        `[importOne] I can not import already defined name.`,
        ``,
        `  name: ${name}`,
      ].join("\n"),
    )
  }

  const definition = targetMod.definitions.get(name)
  if (definition === undefined) {
    const fetcher = mod.loader.fetcher

    throw new Error(
      [
        `[importOne] I can not import undefined name.`,
        ``,
        `  name: ${name}`,
        `  current module url: ${fetcher.formatURL(mod.url)}`,
        `  imported module url: ${fetcher.formatURL(targetMod.url)}`,
      ].join("\n"),
    )
  }

  mod.definitions.set(name, definition)

  if (definition["@kind"] === "NodeDefinition") {
    importNodeRules(mod, targetMod, {
      url: definition.mod.url,
      name: definition.name,
    })
  }
}
