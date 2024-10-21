import { findDefinitionOrFail } from "../mod/findDefinitionOrFail.js"
import { type Mod } from "../mod/index.js"

export function checkRuleIsAboutOwnNode(
  mod: Mod,
  firstName: string,
  secondName: string,
): void {
  const first = findDefinitionOrFail(mod, firstName)
  const second = findDefinitionOrFail(mod, secondName)

  const fetcher = mod.loader.fetcher

  if (
    first.mod.url.href !== mod.url.href &&
    second.mod.url.href !== mod.url.href
  ) {
    throw new Error(
      [
        `[checkRuleIsAboutOwnNode] To define a rule, one of the node must be owned by this module.`,
        ``,
        `  loading module url: ${fetcher.formatURL(mod.url)}`,
        `  first node module url: ${fetcher.formatURL(first.mod.url)}`,
        `  second node module url: ${fetcher.formatURL(second.mod.url)}`,
      ].join("\n"),
    )
  }
}
