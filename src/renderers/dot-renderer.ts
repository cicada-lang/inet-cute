import { graphviz } from "@hpcc-js/wasm"

export class DotRenderer {
  async render(dot: string): Promise<string> {
    return await graphviz.layout(dot, "svg", "dot")
  }
}
