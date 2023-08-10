import { Loader } from "../../loader"
import { Definition } from "../definition"
import { Rule } from "../rule"

export type Mod = {
  loader: Loader
  url: URL
  text: string
  definitions: Map<string, Definition>
  rules: Map<string, Rule>
}
