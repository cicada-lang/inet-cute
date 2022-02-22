import Path from "path"
import { Module } from "../lang/module"
import { DotRenderer } from "../renderers/dot-renderer"

async function test(): Promise<void> {
  const mod = new Module(new URL("local://test"))
    .defineNode("zero", [], ["Nat", "*"])
    .defineNode("add1", ["Nat"], ["Nat", "*"])
    .defineNode("add", ["Nat", "Nat", "*"], ["Nat"])

    .defineRule(["zero", "add"], [])
    .defineRule(["add1", "add"], ["add", "add1"])

    .defineNode("main", ["Nat", "*"], [])

    .defineNet("two", ["zero", "add1", "zero", "add1", "add", "main"])

  const net = mod.buildNet("two")

  const renderer = new DotRenderer()

  await renderer.renderToFile(
    Path.resolve(__dirname, "../../output/nat-init.svg"),
    net.formatDot()
  )

  net.run()

  await renderer.renderToFile(
    Path.resolve(__dirname, "../../output/nat-result.svg"),
    net.formatDot()
  )
}

test()
