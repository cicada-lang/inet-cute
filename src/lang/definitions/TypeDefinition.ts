import { Definition } from "../definition"
import { Mod } from "../mod"
import { Net } from "../net"

export class TypeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public arity: number,
  ) {}

  compose(net: Net): void {
    throw new Error(
      `[TypeDefinition.compose] Can not compose a type: ${this.name}`,
    )
  }
}
