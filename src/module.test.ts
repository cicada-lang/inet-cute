import { Module } from "./module"

async function test(): Promise<void> {
  const mod = new Module()
    .defineNode("zero", [], ["Nat", "*"])
    .defineNode("add1", ["Nat"], ["Nat", "*"])
    .defineNode("add", ["Nat", "Nat", "*"], ["Nat"])

    .defineRule(["zero", "add"], [])
    .defineRule(["add1", "add"], ["add", "add1"])

    .defineNode("close", ["Nat", "*"], [])

    .defineNet("two", ["zero", "add1", "zero", "add1", "add", "close"])

  const net = mod.buildNet("two")

  net.run()

  console.log(await net.render())
}

test()
