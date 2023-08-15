import { Env } from "../env"
import { formatNet } from "../net/formatNet"
import { formatNode } from "../node/formatNode"

export function formatNetFromEnv(env: Env): string {
  const lines = []

  for (const value of env.stack) {
    if (value["@kind"] === "Port") {
      lines.push(`(${formatNode(value.node)})-${value.name}`)
    }
  }

  return [formatNet(env.net), ...lines].join("\n")
}
