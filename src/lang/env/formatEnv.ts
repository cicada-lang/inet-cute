import { indent } from "../../utils/indent.ts"
import { formatNet } from "../net/formatNet.ts"
import { netIsEmpty } from "../net/netIsEmpty.ts"
import { formatValue } from "../value/index.ts"
import { type Env } from "./Env.ts"

export function formatEnv(env: Env): string {
  const netText = netIsEmpty(env.net)
    ? "net end"
    : [`net`, indent(formatNet(env.net)), `end`].join("\n")

  const stackText =
    env.stack.length === 0
      ? "stack end"
      : [`stack`, indent(env.stack.map(formatValue).join(" ")), `end`].join(
          "\n",
        )

  const localsText =
    env.locals.size === 0
      ? "locals end"
      : [
          `locals`,
          indent(
            Array.from(env.locals.entries())
              .map(([name, value]) => `${formatValue(value)} $${name}`)
              .join("\n"),
          ),
          `end`,
        ].join("\n")

  return [
    `env`,
    indent(netText),
    indent(stackText),
    indent(localsText),
    `end`,
  ].join("\n")
}
