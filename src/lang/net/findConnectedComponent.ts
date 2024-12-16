import { type Node } from "../node/index.ts"
import { type Net } from "./Net.ts"
import { copyConnectedComponent } from "./copyConnectedComponent.ts"
import { createNet } from "./createNet.ts"

export function findConnectedComponent(net: Net, node: Node): Net {
  const component = createNet()
  copyConnectedComponent(net, component, node)
  return component
}
