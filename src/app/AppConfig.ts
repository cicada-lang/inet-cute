export class AppConfig {
  pkg: any

  constructor() {
    // NOTE We should not use import for module not in `src/`,
    //   otherwise `lib/` will have a extra level.
    this.pkg = require("../../package.json")
  }
}
