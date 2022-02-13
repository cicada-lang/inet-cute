import { Port } from "./port"

export class Edge {
  start: Port
  end: Port

  constructor(start: Port, end: Port) {
    this.start = start
    this.end = end
  }
}
