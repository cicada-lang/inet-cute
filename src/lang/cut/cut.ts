import { Ctx, SignedType } from "../ctx"
import { NodeDefinition } from "../definition"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Word } from "../word"
import { cutDefinition } from "./cutDefinition"

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
      const found = ctx.localSignedTypes.get(word.name)
      if (found !== undefined) {
        ctx.signedTypes.push(found)
        ctx.localSignedTypes.delete(word.name)
        return
      } else {
        const definition = lookupDefinitionOrFail(mod, word.name)
        cutDefinition(ctx, definition)
        return
      }
    }

    case "LocalSet": {
      const signedType = ctx.signedTypes.pop()

      if (signedType === undefined) {
        throw new Error(
          `[cut / LocalSet] expect a signed type on the top of the stack`,
        )
      }

      ctx.localSignedTypes.set(word.name, signedType)
      return
    }

    case "PortPush": {
      const currentSignedType = findCurrentSignedTypeOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      ctx.signedTypes.push(currentSignedType)

      return
    }

    case "PortReconnect": {
      const currentSignedType = findCurrentSignedTypeOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      return
    }
  }
}

function findCurrentSignedTypeOrFail(
  nodeName: string,
  portName: string,
  options?: CutOptions,
): SignedType {
  const who = "findCurrentTypeOrFail"

  const { current } = options || {}

  if (current === undefined) {
    throw new Error(`[${who}] I expect current start and end node definitions`)
  }

  const found = findSignedTypeInNodeDefinitions(nodeName, portName, [
    current.start,
    current.end,
  ])

  if (found === undefined) {
    throw new Error(`[${who}] I can not find port: ${portName} in nodes`)
  }

  return found
}

function findSignedTypeInNodeDefinitions(
  nodeName: string,
  portName: string,
  definitions: Array<NodeDefinition>,
): SignedType | undefined {
  for (const definition of definitions) {
    if (definition.name === nodeName) {
      return findSignedTypeInNodeDefinition(portName, definition)
    }
  }
}

function findSignedTypeInNodeDefinition(
  portName: string,
  definition: NodeDefinition,
): SignedType | undefined {
  for (const typeExp of definition.input) {
    if (typeExp.name === portName) {
      return {
        t: typeExp.t,
        sign: -1,
      }
    }
  }

  for (const typeExp of definition.output) {
    if (typeExp.name === portName) {
      return {
        t: typeExp.t,
        sign: 1,
      }
    }
  }
}
