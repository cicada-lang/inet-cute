import { type ComposeOptions } from "../compose/compose.js"
import { type Env } from "../env/index.js"
import { type Mod } from "../mod/index.js"
import { type PortExp } from "../port/PortExp.js"
import { type Span } from "../span/index.js"
import { type Word } from "../word/index.js"

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
