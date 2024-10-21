import { formatValue } from "../value/formatValue.js"
import { type Value } from "../value/index.js"

export function checkTypeTermArgs(args: Array<Value>): void {
  for (const arg of args) {
    if (arg["@kind"] !== "Symbol" && arg["@kind"] !== "TypeTerm") {
      throw new Error(
        [
          `[checkTypeTermArgs] I expect all args of a TypeTerm to be Symbol or TypeTerm.`,
          ``,
          `  args: [${args.map(formatValue).join(", ")}]`,
        ].join("\n"),
      )
    }
  }
}
