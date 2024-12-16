import { type Value } from "../value/index.ts"

export function checkAllLocalsAreUsed(locals: Map<string, Value>): void {
  if (locals.size > 0) {
    throw new Error(
      [
        `[checkAllLocalsAreUsed] I expect all locals are used.`,
        ``,
        `  unused local names: ${Array.from(locals.keys()).join(", ")}`,
      ].join("\n"),
    )
  }
}
