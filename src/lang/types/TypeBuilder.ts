import { Type } from "../type"
import * as Types from "."

export class TypeBuilder {
  exps: Array<string>

  constructor(exps: Array<string>) {
    this.exps = exps
  }

  build(): Array<Type> {
    const types: Array<Type> = []
    for (const exp of this.exps) {
      if (exp === "*") {
        const t = types.pop()
        if (t === undefined) {
          throw new Error(
            [
              `Fail to build type,`,
              `I expect a type on the stack when applying *`,
              `  exps: ${this.exps}`,
            ].join("\n"),
          )
        } else {
          types.push(new Types.PrincipalType(t))
        }
      } else {
        types.push(new Types.AtomType(exp))
      }
    }

    return types
  }
}
