import { ParsingError } from "@cicada-lang/partech/lib/errors"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Report } from "../../lang/errors/Report"
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
      blue(`  ${runner.name} ${this.name} docs/tests/datatypes/Nat.inet`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const file = Path.resolve(argv.mod)
    const url = new URL(`file:${file}`)
    const text = await fs.promises.readFile(file, "utf8")
    const mod = createMod(url, text)

    try {
      for (const stmt of parseStmts(text)) {
        await stmt.execute(mod)
      }
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.report(text))
        process.exit(1)
      } else if (error instanceof Report) {
        console.error(error.format())
        process.exit(1)
      } else {
        throw error
      }
    }
  }
}
