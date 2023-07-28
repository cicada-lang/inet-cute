import * as Types from "."
import { Type } from "../type"

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
            ].join("\n"),
          )
        } else {
          throw new Error()
        }
      } else {
        types.push(new Types.AtomType(word))
      }
    }

    return types
  }
}
