import { Def } from "../def"
import { Net } from "../graph"
import { Mod } from "../mod"

export class OperatorDef extends Def {
  constructor(
    public mod: Mod,
    public name: string,
    public meaning: (net: Net) => void,
  ) {
    super()
  }
}
