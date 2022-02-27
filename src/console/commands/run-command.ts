import { Command } from "@enchanterjs/enchanter/lib/command"
import { CommandRunner } from "@enchanterjs/enchanter/lib/command-runner"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Module } from "../../lang/module"

type Args = { file: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run an inet file"

  args = { file: ty.string() }
  opts = {}

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
    console.log(argv)
  }
}
