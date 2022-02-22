export abstract class Type {
  abstract format(): string

  static build(words: Array<string>): Array<Type> {
    return new TypeBuilder(words).build()
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

class TypeBuilder {
  words: Array<string>

  constructor(words: Array<string>) {
    this.words = words
  }

  build(): Array<Type> {
    const types: Array<Type> = []
    for (const word of this.words) {
      if (word === "*") {
        const t = types.pop()
        if (t === undefined) {
          throw new Error(
            [
              `Fail to build type,`,
              `I expect a type on the stack when applying *`,
              `  words: ${this.words}`,
            ].join("\n")
          )
        } else {
          types.push(new PrincipalType(t))
        }
      } else {
        types.push(new AtomType(word))
      }
    }

    return types
  }
}
