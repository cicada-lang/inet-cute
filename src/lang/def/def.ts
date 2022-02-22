import { Module } from "../module"

export abstract class Def {
  mod: Module

  constructor(mod: Module) {
    this.mod = mod
  }
}
