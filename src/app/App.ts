import { AppHome } from "./AppHome.ts"
import { AppReplEventHandler } from "./AppReplEventHandler.ts"

export class App {
  home = new AppHome()
  replEventHandler = new AppReplEventHandler()
}
