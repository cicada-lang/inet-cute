import { Span } from "../span"

export type Word = Call | Local | PortPush | PortReconnect

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

export type Local = {
  kind: "Local"
  name: string
  span: Span
}

export function Local(name: string, span: Span): Local {
  return {
    kind: "Local",
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
