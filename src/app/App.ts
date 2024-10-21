import { AppHome } from "./AppHome.js"
import { AppReplEventHandler } from "./AppReplEventHandler.js"

export class App {
  home = new AppHome()
  replEventHandler = new AppReplEventHandler()
}
