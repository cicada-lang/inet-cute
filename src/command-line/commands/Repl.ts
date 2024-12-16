import { Repls } from "@cicada-lang/framework"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import Path from "path"
import { app } from "../../app/index.ts"

type Args = {}

export class Repl extends Command<Args> {
  name = "repl"

  description = "Open an interactive REPL"

  args = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes you into a rabbit hole`,
      `  called REPL -- "Read Evaluate Print Loop".`,
      ``,
      `In which you can try some ideas real quick.`,
      ``,
      blue(`  ${runner.name} ${this.name}`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args): Promise<void> {
    const repl = await Repls.ReadlineRepl.create({
      dir: Path.resolve(process.cwd()),
      handler: app.replEventHandler,
      files: app.home,
      commitOnDoubleNewline: true,
    })

    await repl.run()
  }
}
