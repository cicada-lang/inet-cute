import * as pt from "@cicada-lang/partech"
import { Word } from "../../word"

export function word_matcher(tree: pt.Tree): Word {
  return pt.matcher<Word>({
    "word:call": ({ name }, { span }) => ({
      ["@kind"]: "Call",
      name: pt.str(name),
      span,
    }),
    "word:local": ({ name }, { span }) => ({
      ["@kind"]: "Local",
      name: pt.str(name),
      span,
    }),
    "word:port_push": ({ nodeName, portName }, { span }) => ({
      ["@kind"]: "PortPush",
      nodeName: pt.str(nodeName),
      portName: pt.str(portName),
      span,
    }),
    "word:port_reconnect": ({ nodeName, portName }, { span }) => ({
      ["@kind"]: "PortReconnect",
      nodeName: pt.str(nodeName),
      portName: pt.str(portName),
      span,
    }),
  })(tree)
}

export function words_matcher(tree: pt.Tree): Array<Word> {
  return pt.matcher({
    "words:words": ({ words }) =>
      pt.matchers.zero_or_more_matcher(words).map(word_matcher),
  })(tree)
}
