import { ParsingError } from "@cicada-lang/partech/lib/errors"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "node:fs"
import { Fetcher } from "../../fetcher"
import { Report } from "../../lang/errors/Report"
import { Loader } from "../../loader"
import { createURL } from "../../utils/createURL"

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
      `Run a file:`,
      ``,
      blue(`  ${runner.name} ${this.name} docs/tests/datatypes/Nat.test.i`),
      ``,
      `Run a URL:`,
      ``,
      blue(`  ${runner.name} ${this.name} https://cdn.inet.cic.run/docs/tests/datatypes/Nat.test.i`),

      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const fetcher = new Fetcher()

    fetcher.register("file", async (url) => {
      return await fs.promises.readFile(url.pathname, "utf8")
    })

    const url = createURL(argv.path)
    const text = await fetcher.fetchText(url)

    try {
      const loader = new Loader(fetcher)
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
