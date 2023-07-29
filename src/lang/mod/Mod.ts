import { Definition } from "../definition"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export class Mod {
  definitions: Map<string, Definition> = new Map()

  constructor(public url: URL) {
    defineBuiltInOperators(this)
  }
}
