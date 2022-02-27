import { Command } from "@enchanterjs/enchanter/lib/command"
import { CommandRunner } from "@enchanterjs/enchanter/lib/command-runner"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Module } from "../../lang/module"
import { Parser } from "../../lang/parser"
import { NetRenderer } from "../../renderers/net-renderer"

type Args = { file: string; net: string }
type Opts = { init: string; result: string }

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run an inet file"

  args = { file: ty.string(), net: ty.string() }
  opts = { init: ty.string(), result: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command runs an inet file,`,
      `executes the top-level statements.`,
      ``,
      `It supports ${blue(".inet")} file extensions.`,
      ``,
      blue(`  ${runner.name} ${this.name} list.inet`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const file = Path.resolve(argv.file)
    const url = new URL(`file:${file}`)
    const mod = new Module(url)

    const text = await fs.promises.readFile(file, "utf8")
    const parser = new Parser()
    const stmts = parser.parseStmts(text)

    for (const stmt of stmts) {
      stmt.execute(mod)
    }

    const net = mod.buildNet(argv.net)

    const renderer = new NetRenderer()

    {
      const text = await renderer.render(net)
      const path = Path.resolve(argv.init)

      console.log(`>>> init: ${path}`)

      await fs.promises.mkdir(Path.dirname(path), { recursive: true })
      await fs.promises.writeFile(path, text)
    }

    net.run()

    {
      const text = await renderer.render(net)
      const path = Path.resolve(argv.result)

      console.log(`>>> result: ${path}`)

      await fs.promises.mkdir(Path.dirname(path), { recursive: true })
      await fs.promises.writeFile(path, text)
    }
  }
}
