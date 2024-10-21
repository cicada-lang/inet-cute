import { type Span } from "../span/index.js"

export type Word =
  | Call
  | LiteralNode
  | Builtin
  | Local
  | PortPush
  | PortReconnect
  | GenerateSymbol
  | Label

export type Call = {
  "@type": "Word"
  "@kind": "Call"
  name: string
  span: Span
}

export type LiteralNode = {
  "@type": "Word"
  "@kind": "LiteralNode"
  name: string
  span: Span
}

export type Builtin = {
  "@type": "Word"
  "@kind": "Builtin"
  name: string
  span: Span
}

export type Local = {
  "@type": "Word"
  "@kind": "Local"
  name: string
  span: Span
}

export type PortPush = {
  "@type": "Word"
  "@kind": "PortPush"
  nodeName: string
  portName: string
  span: Span
}

export type PortReconnect = {
  "@type": "Word"
  "@kind": "PortReconnect"
  nodeName: string
  portName: string
  span: Span
}

export type GenerateSymbol = {
  "@type": "Word"
  "@kind": "GenerateSymbol"
  name: string
  span: Span
}

export type Label = {
  "@type": "Word"
  "@kind": "Label"
  label: string
  isImportant?: boolean
  span: Span
}
