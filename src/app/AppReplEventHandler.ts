import { ReplEvent, ReplEventHandler } from "@cicada-lang/framework/lib/repl"
import { ParsingError } from "@cicada-lang/partech"
import fs from "fs"
import process from "process"
import { Fetcher } from "../fetcher/Fetcher.js"
import { Report } from "../lang/errors/Report.js"
import { Loader } from "../loader"

export class AppReplEventHandler extends ReplEventHandler {
  pathname = process.cwd() + "/repl"
  loader = new Loader({ fetcher: new Fetcher() })

  constructor() {
    super()
    this.loader.fetcher.register("file", {
      fetchText: (url) => fs.readFileSync(url.pathname, "utf8"),
    })
    this.loader.fetcher.register("repl", {
      fetchText: (url) => {
        return url.pathname === this.pathname
          ? ""
          : fs.readFileSync(url.pathname, "utf8")
      },
    })
  }

  greeting(): void {
    console.log(`Mo ${app.config.pkg.version}`)
  }

  async handle(event: ReplEvent): Promise<void> {
    const { text } = event

    try {
      const url = new URL(`repl://${this.pathname}`)
      await this.loader.load(url)
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.report(text))
      } else if (error instanceof Report) {
        console.error(error.format())
      } else {
        console.error(error)
      }
    }
  }
}
