import { Definition } from "../definition"
import { Mod } from "../mod"
import { Net } from "../net"

export class OperatorDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public compose: (net: Net) => void,
  ) {}
}
