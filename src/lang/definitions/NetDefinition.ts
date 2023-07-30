import { Definition } from "../definition"
import { Net } from "../graph"
import { applyWords } from "../graph/applyWords"
import { Mod } from "../mod"
import { Word } from "../word"

export class NetDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public words: Array<Word>,
  ) {}

  meaning(net: Net): void {
    applyWords(this.mod, net, this.words)
  }
}
