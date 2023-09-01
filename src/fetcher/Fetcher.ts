export type FetcherHandler = {
  fetchText: (url: URL) => string | Promise<string>
  formatURL?: (url: URL) => string
}

export class Fetcher {
  handlers: Record<string, FetcherHandler> = {}

  constructor() {
    this.register("http", {
      fetchText: async (url) => await (await fetch(url)).text(),
    })

    this.register("https", {
      fetchText: async (url) => await (await fetch(url)).text(),
    })
  }

  findHandler(url: URL): FetcherHandler | undefined {
    const scheme = url.protocol.slice(0, url.protocol.length - 1)
    return this.handlers[scheme]
  }

  formatURL(url: URL): string {
    const handler = this.findHandler(url)
    if (handler === undefined) {
      throw new Error(
        [
          `[Fetcher.formatURL] I meet unknown protocol.`,
          ``,
          `  protocol: ${url.protocol}`,
          `  url: ${url.href}`,
        ].join("\n"),
      )
    }

    if (handler.formatURL) {
      return handler.formatURL(url)
    } else {
      return url.href
    }
  }

  async fetchText(url: URL): Promise<string> {
    const handler = this.findHandler(url)
    if (handler === undefined) {
      throw new Error(
        [
          `[Fetcher.fetchText] I meet unknown protocol.`,
          ``,
          `  protocol: ${url.protocol}`,
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
