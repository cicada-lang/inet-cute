import { ReplEvent, ReplEventHandler } from "@cicada-lang/framework/lib/repl"
import { ParsingError } from "@cicada-lang/partech"
import fs from "fs"
import { relative } from "node:path"
import process from "process"
import { app } from "../app"
import { Fetcher } from "../fetcher/Fetcher.js"
import { Report } from "../lang/errors/Report.js"
import { parseStmts } from "../lang/syntax/index.js"
import { Loader } from "../loader"

export class AppReplEventHandler extends ReplEventHandler {
  pathname = process.cwd() + "/repl"
  loader = new Loader({ fetcher: new Fetcher() })

  constructor() {
    super()

    this.loader.fetcher.register("file", {
      async fetchText(url) {
        if (process.platform === "win32") {
          return fs.readFileSync(url.pathname.slice(1), "utf8")
        } else {
          return fs.readFileSync(url.pathname, "utf8")
        }
      },

      formatURL(url) {
        if (process.platform === "win32") {
          return relative(process.cwd(), url.pathname.slice(1)).replaceAll(
            "\\",
            "/",
          )
        } else {
          return relative(process.cwd(), url.pathname)
        }
      },
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
    console.log(`iNet ${app.config.pkg.version}`)
  }

  async handle(event: ReplEvent): Promise<void> {
    const url = new URL(`repl://${this.pathname}`)
    const mod = await this.loader.load(url)

    const { text } = event

    try {
      // const length
      const stmts = parseStmts(text)
      mod.text += text

      for (const stmt of stmts) {
        await stmt.execute(mod)
      }
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
