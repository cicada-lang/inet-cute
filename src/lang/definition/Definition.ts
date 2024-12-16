import { type ComposeOptions } from "../compose/compose.ts"
import { type Env } from "../env/index.ts"
import { type Mod } from "../mod/index.ts"
import { type PortExp } from "../port/PortExp.ts"
import { type Span } from "../span/index.ts"
import { type Word } from "../word/index.ts"

export type Definition =
  | NodeDefinition
  | WordDefinition
  | OperatorDefinition
  | TypeDefinition

export type NodeDefinition = {
  "@type": "Definition"
  "@kind": "NodeDefinition"
  mod: Mod
  span: Span
  name: string
  input: Array<PortExp>
  output: Array<PortExp>
}

export type WordDefinition = {
  "@type": "Definition"
  "@kind": "WordDefinition"
  mod: Mod
  span: Span
  name: string
  input: Array<Word>
  output: Array<Word>
  words?: Array<Word>
}

export type OperatorDefinition = {
  "@type": "Definition"
  "@kind": "OperatorDefinition"
  mod: Mod
  name: string
  compose: (env: Env, options: ComposeOptions) => void
}

export type TypeDefinition = {
  "@type": "Definition"
  "@kind": "TypeDefinition"
  mod: Mod
  span: Span
  name: string
  input: Array<Word>
  output: Array<Word>
  inputArity: number
}
