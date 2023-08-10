import { ParsingError } from "@cicada-lang/partech/lib/errors"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Report } from "../../lang/errors/Report"
import { Loader } from "../../loader"

type Args = { path: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run an inet program"

  args = { path: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      blue(`  ${runner.name} ${this.name} docs/tests/datatypes/Nat.inet`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const file = Path.resolve(argv.path)
    const url = new URL(`file:${file}`)
    const text = await fs.promises.readFile(file, "utf8")

    try {
      const loader = new Loader()
      await loader.load(url)
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
