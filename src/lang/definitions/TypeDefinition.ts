import { Definition } from "../definition"
import { Mod } from "../mod"
import { Net } from "../net"

export class TypeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public arity: number,
  ) {}

  call(net: Net): void {
    throw new Error(`[TypeDefinition.call] Can not call a type: ${this.name}`)
  }
}
