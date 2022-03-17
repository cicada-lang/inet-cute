import { Module } from "../module"
import { Net } from "../net"

export abstract class Exp {
  abstract apply(mod: Module, net: Net): void
}
