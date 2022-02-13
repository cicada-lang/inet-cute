export abstract class Type {
  abstract format(): string

  isPrincipal(): boolean {
    return false
  }
}

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
    return "*" + this.t.format()
  }
}
