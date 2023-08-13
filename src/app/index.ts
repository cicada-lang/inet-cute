import { App } from "./App"

declare global {
  var app: App
}

export const app = new App()

globalThis.app = app
