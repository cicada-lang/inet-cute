import { Definition } from "../definition"
import { Net } from "../graph"
import { composeWords } from "../graph/composeWords"
import { Mod } from "../mod"
import { Word } from "../word"

export class NetDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public words: Array<Word>,
  ) {}

  call(net: Net): void {
    composeWords(this.mod, net, this.words)
  }
}
