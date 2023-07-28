import { Def } from "../def"
import { Net } from "../graph"
import { Mod } from "../mod"
import { Word } from "../word"

export class NetDef extends Def {
  constructor(
    public mod: Mod,
    public name: string,
    public words: Array<Word>,
  ) {
    super()
  }

  meaning(net: Net): void {
    for (const word of this.words) {
      word.apply(this.mod, net)
    }
  }
}
