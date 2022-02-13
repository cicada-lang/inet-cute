class Port {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

class Node {
  arity: number

  input: Array<Port>
  output: Array<Port>

  // principal: Port
  // auxiliary: Array<Port>

  constructor(opts: {
    arity: number
    input: Array<Port>
    output: Array<Port>
  }) {
    this.arity = opts.arity
    this.input = opts.input
    this.output = opts.output
  }
}

class Edge {
  //
}

class Rule {
  //
}

class ActivePair {
  //
}

class Net {
  ports: Array<Port>

  constructor(ports: Array<Port>) {
    this.ports = ports
  }
}
