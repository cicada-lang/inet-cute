import { Def } from "../def"
import { Net } from "../graph"
import { Mod } from "../mod"

export class OperatorDef extends Def {
  constructor(
    public mod: Mod,
    public name: string,
    public refer: (net: Net) => void,
  ) {
    super()
  }
}
