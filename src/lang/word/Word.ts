import { Span } from "../span"

export type Word = Call | Local | PortPush | PortReconnect

export type Call = {
  "@kind": "Call"
  name: string
  span: Span
}

export type Local = {
  "@kind": "Local"
  name: string
  span: Span
}

export type PortPush = {
  "@kind": "PortPush"
  nodeName: string
  portName: string
  span: Span
}

export type PortReconnect = {
  "@kind": "PortReconnect"
  nodeName: string
  portName: string
  span: Span
}
