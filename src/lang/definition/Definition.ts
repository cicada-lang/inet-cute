import { Ctx } from "../ctx"
import { Env } from "../env"
import { PortExp } from "../graph/PortExp"
import { Mod } from "../mod"
import { Span } from "../span"
import { SignedType } from "../type"
import { Word } from "../word"

export type Definition =
  | NodeDefinition
  | WordDefinition
  | OperatorDefinition
  | TypeDefinition

export type NodeDefinition = {
  kind: "NodeDefinition"
  mod: Mod
  span: Span
  name: string
  input: Array<PortExp>
  output: Array<PortExp>
}

export function NodeDefinition(
  mod: Mod,
  span: Span,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): NodeDefinition {
  return {
    kind: "NodeDefinition",
    mod,
    span,
    name,
    input,
    output,
  }
}

export type WordDefinition = {
  kind: "WordDefinition"
  mod: Mod
  span: Span
  name: string
  input: Array<SignedType>
  output: Array<SignedType>
  words?: Array<Word>
}

export function WordDefinition(
  mod: Mod,
  span: Span,
  name: string,
  input: Array<SignedType>,
  output: Array<SignedType>,
): WordDefinition {
  return {
    kind: "WordDefinition",
    mod,
    span,
    name,
    input,
    output,
  }
}

export type OperatorDefinition = {
  kind: "OperatorDefinition"
  mod: Mod
  name: string
  compose: (env: Env) => void
  cut: (ctx: Ctx) => void
}

export function OperatorDefinition(
  mod: Mod,
  name: string,
  compose: (env: Env) => void,
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
  span: Span
  name: string
  arity: number
}

export function TypeDefinition(
  mod: Mod,
  span: Span,
  name: string,
  arity: number,
): TypeDefinition {
  return {
    kind: "TypeDefinition",
    mod,
    span,
    name,
    arity,
  }
}
