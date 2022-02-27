import { Command } from "@enchanterjs/enchanter/lib/command"
import { CommandRunner } from "@enchanterjs/enchanter/lib/command-runner"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Module } from "../../lang/module"
import { Net } from "../../lang/net"
import { Parser } from "../../lang/parser"
import { NetRenderer } from "../../renderers/net-renderer"

type Args = { mod: string }
type Opts = {
  net: string
  initial?: string
  finial?: string
}

export class RenderCommand extends Command<Args, Opts> {
  name = "render"

  description = "Render a net of a module to initial and finial SVG files"

  args = { mod: ty.string() }
  opts = {
    net: ty.string(),
    initial: ty.optional(ty.string()),
    finial: ty.optional(ty.string()),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `Given a module and a net, the ${blue(this.name)} command renders two SVG files,`,
      `one for the initial state of the net,`,
      `another for the finial state after all reductions.`,
      ``,
      `It supports ${blue(".inet")} file extensions.`,
      ``,
      blue(`  ${runner.name} ${this.name} docs/tests/nat.inet --net two`),
      ``,
      `The output files of the about command will be:`,
      `  - docs/tests/nat.inet.nat.initial.svg`,
      `  - docs/tests/nat.inet.nat.finial.svg`,
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const file = Path.resolve(argv.mod)
    const url = new URL(`file:${file}`)
    const mod = new Module(url)

    const text = await fs.promises.readFile(file, "utf8")
    const parser = new Parser()
    const stmts = parser.parseStmts(text)

    for (const stmt of stmts) {
      stmt.execute(mod)
    }

    const net = mod.buildNet(argv.net)

    renderFile(net, argv.initial || `${file}.${argv.net}.initial.svg`)

    net.run()

    renderFile(net, argv.finial || `${file}.${argv.net}.finial.svg`)
  }
}

async function renderFile(net: Net, output: string): Promise<void> {
  const renderer = new NetRenderer()
  const text = await renderer.render(net)
  const path = Path.resolve(output)
  console.log(`- ${path}`)
  await fs.promises.mkdir(Path.dirname(path), { recursive: true })
  await fs.promises.writeFile(path, text)
}
