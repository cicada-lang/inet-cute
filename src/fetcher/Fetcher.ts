export type FetcherHandler = {
  fetchText: (url: URL) => string | Promise<string>
  formatRelativeURL?: (url: URL) => string
}

export class Fetcher {
  private handlers: Record<string, FetcherHandler> = {}

  constructor() {
    this.register("http", {
      fetchText: async (url) => await (await fetch(url)).text(),
    })

    this.register("https", {
      fetchText: async (url) => await (await fetch(url)).text(),
    })
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

    return handler.fetchText(url)
  }

  register(scheme: string, handler: FetcherHandler): void {
    this.handlers[scheme] = handler
  }
}
