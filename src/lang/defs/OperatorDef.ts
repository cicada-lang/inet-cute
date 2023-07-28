import { Def } from "../def"
import { Mod } from "../mod"
import { Net } from "../graph"

export class OperatorDef extends Def {
  constructor(
    public mod: Mod,
    public name: string,
    public refer: (net: Net) => void,
  ) {
    super()
  }
}
