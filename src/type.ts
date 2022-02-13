export abstract class Type {
  abstract format(): string

  static build(words: Array<string>): Array<Type> {
    return []
  }

  isPrincipal(): boolean {
    return false
  }
}

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
