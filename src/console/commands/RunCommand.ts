import { ParsingError } from "@cicada-lang/partech/lib/errors"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { createMod } from "../../lang/mod/createMod"
import { parseStmts } from "../../lang/syntax"

type Args = { mod: string }
type Opts = { name?: string }

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run an inet program"

  args = { mod: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      blue(`  ${runner.name} ${this.name} docs/tests/nat.inet --name two`),
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
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.report(text)
        console.error(report)
      }

      throw error
    }
  }
}
