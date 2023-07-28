import { Definition } from "../definition"
import { Net } from "../graph"
import { Mod } from "../mod"
import { Word } from "../word"

export class NetDefinition extends Definition {
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
