import { Def } from "../def"
import { Mod } from "../mod"
import { Net } from "../net"

export class TypeDef extends Def {
  constructor(
    public mod: Mod,
    public name: string,
    public arity: number,
  ) {
    super()
  }

  refer(net: Net): void {
    throw new Error("TODO")
  }
}
