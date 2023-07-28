import { Definition } from "../definition"
import { Net } from "../graph"
import { Mod } from "../mod"

export class OperatorDefinition extends Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public meaning: (net: Net) => void,
  ) {
    super()
  }
}
