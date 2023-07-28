import { Port } from "../port"

export class Edge {
  start: Port
  end: Port

  constructor(start: Port, end: Port) {
    // TODO check port type.
    this.start = start
    this.end = end

    start.connection = { edge: this, port: end }
    end.connection = { edge: this, port: start }
  }
}
