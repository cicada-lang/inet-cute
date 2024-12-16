import { indent } from "../../utils/indent.ts"
import { type Env } from "../env/index.ts"
import { findConnectedComponent } from "../net/findConnectedComponent.ts"
import { formatNet } from "../net/formatNet.ts"
import { formatValue } from "../value/formatValue.ts"

export function compose(env: Env): void {
  const value = env.stack[env.stack.length - 1]
  if (value === undefined) {
    throw new Error(`[@inspect] I expect a value on the stack.`)
  }

  if (value["@kind"] === "Port") {
    const connectedcomponent = findConnectedComponent(env.net, value.node)
    const netText = formatNet(connectedcomponent)
    if (netText.length === 0) {
      env.mod.loader.onOutput(`netFromPort ${formatValue(value)} end`)
    } else {
      env.mod.loader.onOutput(`netFromPort ${formatValue(value)}`)
      env.mod.loader.onOutput(indent(netText))
      env.mod.loader.onOutput("end")
    }
  } else {
    env.mod.loader.onOutput(formatValue(value))
  }
}
