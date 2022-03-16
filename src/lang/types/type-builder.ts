import { Type } from "../type"
import * as Types from "../types"

export class TypeBuilder {
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
          types.push(new Types.PrincipalType(t))
        }
      } else {
        types.push(new Types.AtomType(word))
      }
    }

    return types
  }
}
