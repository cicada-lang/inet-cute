import { Type } from "../type"

export class PrincipalType extends Type {
  t: Type

  constructor(t: Type) {
    super()
    this.t = t
  }

  isPrincipal(): boolean {
    return true
  }

  format(): string {
    return this.t.format() + " *"
  }
}
