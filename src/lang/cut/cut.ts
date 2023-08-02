import { Ctx } from "../ctx"
import { NodeDefinition } from "../definition"
import { Mod } from "../mod"
import { Word } from "../word"

export interface CutOptions {
  current?: {
    start: NodeDefinition
    end: NodeDefinition
  }
}

export function cut(
  mod: Mod,
  ctx: Ctx,
  word: Word,
  options?: CutOptions,
): void {
  switch (word.kind) {
    case "Call": {
      //
    }

    case "LocalSet": {
      //
    }

    case "PortPush": {
      //
    }

    case "PortReconnect": {
      //
    }
  }
}
