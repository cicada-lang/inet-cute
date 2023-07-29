import * as pt from "@cicada-lang/partech"
import { Word } from "../../word"
import * as Words from "../../words"

export function word_matcher(tree: pt.Tree): Word {
  return pt.matcher<Word>({
    "word:call": ({ name }, { span }) => new Words.Call(pt.str(name), span),
    "word:let": ({ name }, { span }) => new Words.Let([pt.str(name)], span),
  })(tree)
}

export function words_matcher(tree: pt.Tree): Array<Word> {
  return pt.matcher({
    "words:words": ({ words }) =>
      pt.matchers.zero_or_more_matcher(words).map(word_matcher),
  })(tree)
}
