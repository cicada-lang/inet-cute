import fs from "fs"
import Path from "path"
import { Module } from "../lang/module"
import { NetRenderer } from "../renderers/net-renderer"

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

  const renderer = new NetRenderer()

  {
    const text = await renderer.render(net)
    const path = Path.resolve(__dirname, "../../output/list-init.svg")

    console.log(`>>> ${path}`)

    await fs.promises.mkdir(Path.dirname(path), { recursive: true })
    await fs.promises.writeFile(path, text)
  }

  net.run()

  {
    const text = await renderer.render(net)
    const path = Path.resolve(__dirname, "../../output/list-result.svg")

    console.log(`>>> ${path}`)

    await fs.promises.mkdir(Path.dirname(path), { recursive: true })
    await fs.promises.writeFile(path, text)
  }
}

test()
