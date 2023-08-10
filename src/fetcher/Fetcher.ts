type Handler = (url: URL) => string | Promise<string>

export class Fetcher {
  private handlers: Record<string, Handler> = {}

  constructor() {
    this.register("http", async (url) => await (await fetch(url)).text())
    this.register("https", async (url) => await (await fetch(url)).text())
  }

  async fetchText(url: URL): Promise<string> {
    const scheme = url.protocol.slice(0, url.protocol.length - 1)
    const handler = this.handlers[scheme]
    if (handler === undefined) {
      throw new Error(
        [
          `[Fetcher.fetchText] I fail to load url.`,
          ``,
          `  unknown protocol: ${url.protocol}`,
          `  url: ${url.href}`,
        ].join("\n"),
      )
    }

    return handler(url)
  }

  register(scheme: string, handler: Handler): void {
    this.handlers[scheme] = handler
  }
}
