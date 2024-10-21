import { deleteNodeEntry } from "../net/deleteNodeEntry.js"
import { disconnectPort } from "../net/disconnectPort.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"

export function releaseCapPorts(component: Net, capPorts: Array<Port>): void {
  for (const capPort of capPorts) {
    disconnectPort(component, capPort)
    deleteNodeEntry(component, capPort.node)
  }
}
