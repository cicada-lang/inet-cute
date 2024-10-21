import { type Node } from "../node/index.js"
import { type Net } from "./Net.js"
import { copyConnectedComponent } from "./copyConnectedComponent.js"
import { createNet } from "./createNet.js"

export function findConnectedComponent(net: Net, node: Node): Net {
  const component = createNet()
  copyConnectedComponent(net, component, node)
  return component
}
