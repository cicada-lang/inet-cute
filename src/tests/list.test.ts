import Path from "path"
import { Module } from "../lang/module"
import { DotRenderer } from "../renderers/dot-renderer"

// prettier-ignore
async function test(): Promise<void> {

  const mod = new Module(new URL("local://test"))
    .defineNode("sole", [], ["Trivial", "*"])

    .defineNode("null", [], ["TrivialList", "*"])
    .defineNode("cons", ["TrivialList", "Trivial"], ["Nat", "*"])
    .defineNode("append", ["TrivialList", "TrivialList", "*"], ["TrivialList"])

    .defineRule("null", "append", [])
    .defineRule("cons", "append", ["rot", "rot", "append", "swap", "cons"])

    .defineNode("main", ["TrivialList", "*"], [])

    .defineNet("six_soles", [
      "null",
      "sole", "cons",
      "sole", "cons",
      "sole", "cons",
      "null",
      "sole", "cons",
      "sole", "cons",
      "sole", "cons",
      "append",
      "main",
    ])

  const net = mod.buildNet("six_soles")

  const renderer = new DotRenderer()

  await renderer.renderToFile(
    Path.resolve(__dirname, "../../output/list-init.svg"),
    net.formatDot()
  )

  net.run()

  await renderer.renderToFile(
    Path.resolve(__dirname, "../../output/list-result.svg"),
    net.formatDot()
  )
}

test()
