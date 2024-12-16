import { deleteNodeEntry } from "../net/deleteNodeEntry.ts"
import { disconnectPort } from "../net/disconnectPort.ts"
import { type Net } from "../net/index.ts"
import { type Port } from "../port/index.ts"

export function releaseCapPorts(component: Net, capPorts: Array<Port>): void {
  for (const capPort of capPorts) {
    disconnectPort(component, capPort)
    deleteNodeEntry(component, capPort.node)
  }
}
