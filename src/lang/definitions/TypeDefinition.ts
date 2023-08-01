import { Definition } from "../definition"
import { Net } from "../graph"
import { Mod } from "../mod"

export class TypeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public arity: number,
  ) {}

  meaning(net: Net): void {
    //
  }
}
