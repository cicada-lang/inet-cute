import { Module } from "../module"
import { Net } from "../net"

export abstract class Definition {
  abstract mod: Module
  abstract name: string
  abstract apply(net: Net): void
}
