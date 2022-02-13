interface Port {
  name: string
}

interface Node {
  arity: number

  input: Array<Port>
  output: Array<Port>

  // principal: Port
  // auxiliary: Array<Port>
}

interface Edge {
  //
}

interface Rule {
  //
}

interface ActivePair {
  //
}

interface Net {
  ports: Array<Port>
}
