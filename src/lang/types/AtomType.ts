import { Type } from "../type"

export class AtomType extends Type {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  format(): string {
    return this.name
  }
}
