import { Module } from "./module"

{
  const mod = new Module()
    .defineNode("zero", [], ["Nat", "*"])
    .defineNode("add1", ["Nat"], ["Nat", "*"])
    .defineNode("add", ["Nat", "Nat", "*"], ["Nat"])

  console.log(mod.buildNode("zero"))
  console.log(mod.buildNode("add1"))
  console.log(mod.buildNode("add"))
}

{
  const mod = new Module()
    .defineNode("zero", [], ["Nat", "*"])
    .defineNode("add1", ["Nat"], ["Nat", "*"])
    .defineNode("add", ["Nat", "Nat", "*"], ["Nat"])
    .defineNet("two", ["zero", "add1", "zero", "add1", "add"])

  const net = mod.buildNet("two")

  console.log(net)
}
