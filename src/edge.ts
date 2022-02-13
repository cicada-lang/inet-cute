import { Port } from "./port"

export class Edge {
  start: Port
  end: Port

  constructor(start: Port, end: Port) {
    // TODO check port type.
    this.start = start
    this.end = end
  }
}
