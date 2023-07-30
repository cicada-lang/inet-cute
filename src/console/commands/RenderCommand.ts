import { ParsingError } from "@cicada-lang/partech/lib/errors"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { formatNet } from "../../lang/format"
import { Net } from "../../lang/graph"
import { run } from "../../lang/graph/run"
import { Mod } from "../../lang/mod"
import { createMod } from "../../lang/mod/createMod"
import { modAllNetNames } from "../../lang/mod/modAllNetNames"
import { modBuildNet } from "../../lang/mod/modBuildNet"
import { parseStmts } from "../../lang/syntax"

type Args = { mod: string }
type Opts = { name?: string }

export class RenderCommand extends Command<Args, Opts> {
  name = "render"

  description = "Render a net of a module to initial and finial TXT files"

  args = { mod: ty.string() }
  opts = { name: ty.optional(ty.string()) }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `Given a module and a net, the ${blue(this.name)} command renders two TXT files,`,
      `one for the initial state of the net,`,
      `another for the finial state after all reductions.`,
      ``,
      `It supports ${blue(".inet")} file extensions.`,
      ``,
      blue(`  ${runner.name} ${this.name} docs/tests/nat.inet --name two`),
      ``,
      `The output files of the about command will be:`,
      `  - docs/tests/nat.inet.nat.initial.txt`,
      `  - docs/tests/nat.inet.nat.finial.txt`,
      ``,
      `Without explicit given a name, all named nets in the module will be rendered.`,
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const file = Path.resolve(argv.mod)
    const url = new URL(`file:${file}`)
    const mod = createMod(url)

    const text = await fs.promises.readFile(file, "utf8")

    try {
      const stmts = parseStmts(text)

      for (const stmt of stmts) {
        stmt.execute(mod)
      }

      if (argv.name) {
        renderNet(mod, file, argv.name)
      } else {
        for (const name of modAllNetNames(mod)) {
          renderNet(mod, file, name)
        }
      }
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.report(text)
        console.error(report)
      }

      throw error
    }
  }
}

async function renderNet(mod: Mod, file: string, name: string): Promise<void> {
  const net = modBuildNet(mod, name)
  renderFile(net, `${file}.${name}.initial.txt`)
  run(net)
  renderFile(net, `${file}.${name}.finial.txt`)
}

async function renderFile(net: Net, output: string): Promise<void> {
  const text = formatNet(net)
  const path = Path.resolve(output)
  console.log(`- ${path}`)
  await fs.promises.mkdir(Path.dirname(path), { recursive: true })
  await fs.promises.writeFile(path, text)
}
