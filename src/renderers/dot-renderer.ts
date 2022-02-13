import { graphviz } from "@hpcc-js/wasm"
import fs from "fs"
import Path from "path"

export class DotRenderer {
  async render(dot: string): Promise<string> {
    return await graphviz.layout(dot, "svg", "dot")
  }

  async renderToFile(path: string, dot: string): Promise<void> {
    console.log(`>>> ${path}`)
    await fs.promises.mkdir(Path.dirname(path), { recursive: true })
    await fs.promises.writeFile(path, await this.render(dot))
  }
}
