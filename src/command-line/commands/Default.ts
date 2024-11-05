import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { version } from "../../version.js"
import * as Commands from "./index.js"

type Args = { path?: string }
type Opts = { help?: boolean; version?: boolean }

export class Default extends Command<Args, Opts> {
  name = "default"

  description = "Run an file"

  args = { path: ty.optional(ty.string()) }
  opts = {
    help: ty.optional(ty.boolean()),
    version: ty.optional(ty.boolean()),
  }
  alias = { help: ["h"], version: ["v"] }

  async execute(argv: Args & Opts, runner: CommandRunner): Promise<void> {
    if (argv["help"]) {
      const command = new Commands.CommonHelp()
      await command.execute({}, runner)
      return
    }

    if (argv["version"]) {
      console.log(version)
      return
    }

    const path = argv["path"]

    if (path === undefined) {
      const dir = process.cwd()
      const command = new Commands.Repl()
      await command.execute({ dir })
    } else {
      const command = new Commands.Run()
      await command.execute({ path })
    }
  }
}
