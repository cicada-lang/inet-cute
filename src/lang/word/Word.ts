import { Span } from "../span"

export type Word = Call | LocalSet | PortPush | PortReconnect

export type Call = {
  kind: "Call"
  name: string
  span: Span
}

export function Call(name: string, span: Span): Call {
  return {
    kind: "Call",
    name,
    span,
  }
}

export type LocalSet = {
  kind: "LocalSet"
  name: string
  span: Span
}

export function LocalSet(name: string, span: Span): LocalSet {
  return {
    kind: "LocalSet",
    name,
    span,
  }
}

export type PortPush = {
  kind: "PortPush"
  nodeName: string
  portName: string
  span: Span
}

export function PortPush(
  nodeName: string,
  portName: string,
  span: Span,
): PortPush {
  return {
    kind: "PortPush",
    nodeName,
    portName,
    span,
  }
}

export type PortReconnect = {
  kind: "PortReconnect"
  nodeName: string
  portName: string
  span: Span
}

export function PortReconnect(
  nodeName: string,
  portName: string,
  span: Span,
): PortReconnect {
  return {
    kind: "PortReconnect",
    nodeName,
    portName,
    span,
  }
}
