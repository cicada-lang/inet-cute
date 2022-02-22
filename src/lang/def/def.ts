import { Module } from "../module"
import { Net } from "../net"

export abstract class Def {
  abstract mod: Module
  abstract execute(net: Net): void
}
