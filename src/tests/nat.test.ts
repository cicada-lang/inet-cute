import fs from "fs"
import Path from "path"
import { Module } from "../lang/module"
import { NetRenderer } from "../renderers/net-renderer"

async function test(): Promise<void> {
  const mod = new Module(new URL("local://test"))
    .defineNode("zero", [], ["Nat", "*"])
    .defineNode("add1", ["Nat"], ["Nat", "*"])
    .defineNode("add", ["Nat", "Nat", "*"], ["Nat"])

    .defineRule("zero", "add", [])
    .defineRule("add1", "add", ["add", "add1"])

    .defineNode("main", ["Nat", "*"], [])

    .defineNet("two", ["zero", "add1", "zero", "add1", "add", "main"])

  const net = mod.buildNet("two")

  const renderer = new NetRenderer()

  {
    const text = await renderer.render(net)
    const path = Path.resolve(__dirname, "../../output/nat-init.svg")

    console.log(`>>> ${path}`)

    await fs.promises.mkdir(Path.dirname(path), { recursive: true })
    await fs.promises.writeFile(path, text)
  }

  net.run()

  {
    const text = await renderer.render(net)
    const path = Path.resolve(__dirname, "../../output/nat-result.svg")

    console.log(`>>> ${path}`)

    await fs.promises.mkdir(Path.dirname(path), { recursive: true })
    await fs.promises.writeFile(path, text)
  }
}

test()
