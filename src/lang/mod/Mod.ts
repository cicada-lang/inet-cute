import { Definition } from "../definition"

export type Mod = {
  url: URL
  definitions: Map<string, Definition>
}
