import { Ctx } from "../ctx"
import { PortExp } from "../graph/PortExp"
import { Mod } from "../mod"
import { Net } from "../net"
import { Type } from "../type"
import { Word } from "../word"

export type Definition =
  | NodeDefinition
  | WordDefinition
  | OperatorDefinition
  | TypeDefinition

export type NodeDefinition = {
  kind: "NodeDefinition"
  mod: Mod
  name: string
  input: Array<PortExp>
  output: Array<PortExp>
}

export function NodeDefinition(
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): NodeDefinition {
  return {
    kind: "NodeDefinition",
    mod,
    name,
    input,
    output,
  }
}

export type WordDefinition = {
  kind: "WordDefinition"
  mod: Mod
  name: string
  input: Array<Type>
  output: Array<Type>
  definedWords?: Array<Word>
}

export function WordDefinition(
  mod: Mod,
  name: string,
  input: Array<Type>,
  output: Array<Type>,
): WordDefinition {
  return {
    kind: "WordDefinition",
    mod,
    name,
    input,
    output,
  }
}

export type OperatorDefinition = {
  kind: "OperatorDefinition"
  mod: Mod
  name: string
  compose: (net: Net) => void
  cut: (ctx: Ctx) => void
}

export function OperatorDefinition(
  mod: Mod,
  name: string,
  compose: (net: Net) => void,
  cut: (ctx: Ctx) => void,
): OperatorDefinition {
  return {
    kind: "OperatorDefinition",
    mod,
    name,
    compose,
    cut,
  }
}

export type TypeDefinition = {
  kind: "TypeDefinition"
  mod: Mod
  name: string
  arity: number
}

export function TypeDefinition(
  mod: Mod,
  name: string,
  arity: number,
): TypeDefinition {
  return {
    kind: "TypeDefinition",
    mod,
    name,
    arity,
  }
}
