import { Definition } from "../definition"
import { Mod } from "../mod"
import { Net } from "../net"

export class OperatorDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public call: (net: Net) => void,
  ) {}
}
