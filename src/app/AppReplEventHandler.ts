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

const fetcher = new Fetcher()

const pathname = process.cwd() + "/.repl"

fetcher.register("file", {
  async fetchText(url) {
    if (url.href === `file://${pathname}`) {
      return ""
    }

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

export class AppReplEventHandler extends ReplEventHandler {
  loader = new Loader({ fetcher })

  greeting(): void {
    console.log(`iNet ${app.config.packageJson.version}`)
  }

  async handle(event: ReplEvent): Promise<void> {
    const url = new URL(`file://${pathname}`)
    const mod = await this.loader.load(url)

    const oldText = mod.text
    const oldStmts = [...mod.stmts]

    try {
      const { text } = event
      mod.text += text

      const length = mod.stmts.length
      mod.stmts = parseStmts(mod.text)

      for (const stmt of mod.stmts.slice(length)) {
        await stmt.execute(mod)
      }
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.report(mod.text))
      } else if (error instanceof Report) {
        console.error(error.format())
      } else {
        console.error(error)
      }

      mod.text = oldText
      mod.stmts = oldStmts
    }
  }
}
