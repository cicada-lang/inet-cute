import { AppConfig } from "./AppConfig"
import { AppReplEventHandler } from "./AppReplEventHandler"

export class App {
  config = new AppConfig()
  replEventHandler = new AppReplEventHandler()
}
