import { Span } from "../span"

export type Word = Call | Local | PortPush | PortReconnect

export type Call = {
  "@type": "Word"
  "@kind": "Call"
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
