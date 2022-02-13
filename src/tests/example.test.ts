import Path from "path"
import { Module } from "../lang/module"
import { DotRenderer } from "../renderers/dot-renderer"

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

  const renderer = new DotRenderer()

  await renderer.renderToFile(
    Path.resolve(__dirname, "../../output/example-init.svg"),
    net.formatDot()
  )

  net.run()

  await renderer.renderToFile(
    Path.resolve(__dirname, "../../output/example-result.svg"),
    net.formatDot()
  )
}

test()
