import {
  Parser as SexpParser,
  Lexer,
  Sexp,
  v,
  list,
  Pattern,
  PatternExp,
  Sexps,
} from "@cicada-lang/sexp"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

export class Parser {
  lexer = new Lexer({
    quotes: [
      { mark: "'", symbol: "quote" },
      { mark: ",", symbol: "unquote" },
      { mark: "`", symbol: "quasiquote" },
    ],
    parentheses: [
      { start: "(", end: ")" },
      { start: "[", end: "]" },
      { start: "{", end: "}" },
    ],
    comments: [";", "//"],
    nulls: [],
  })

  parser = new SexpParser({
    lexer: this.lexer,
  })

  parseStmts(text: string): Array<Stmt> {
    return this.parser.parseMany(text).map(matchStmt)
  }
}

function matchSymbol(sexp: Sexp): string {
  if (!(sexp instanceof Sexps.Sym)) {
    throw new Error(`I expect the sexp to be a symbol`)
  }

  return sexp.value
}

function matchList<A>(sexp: Sexp, matcher: (sexp: Sexp) => A): Array<A> {
  if (sexp instanceof Sexps.Null) {
    return []
  }

  if (sexp instanceof Sexps.Cons) {
    return [matcher(sexp.head), ...matchList(sexp.tail, matcher)]
  }

  throw new Error(`I expect the sexp to be a list`)
}

function match<A>(
  sexp: Sexp,
  entries: Array<[PatternExp, (results: Record<string, Sexp>) => A]>
): A {
  for (const [pattern, f] of entries) {
    const results = sexp.match(pattern)
    if (results !== undefined) return f(results)
  }

  throw new Error("Pattern mismatch.")
}

function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define-node", v("name"), ["->", v("input"), v("output")]],
      ({ name, input, output }) =>
        new Stmts.DefineNodeStmt(
          matchSymbol(name),
          matchWords(input),
          matchWords(output),
          { span: sexp.span }
        ),
    ],
    [
      list(
        ["define-net", v("name"), ["->", v("input"), v("output")]],
        v("words")
      ),
      ({ name, input, output, words }) =>
        new Stmts.DefineNetStmt(matchSymbol(name), matchWords(words), {
          span: sexp.span,
        }),
    ],

    [
      ["define-rule", [v("start"), v("end")], v("words")],
      ({ start, end, words }) =>
        new Stmts.DefineRuleStmt(
          matchSymbol(start),
          matchSymbol(end),
          matchWords(words),
          { span: sexp.span }
        ),
    ],
  ])
}

function matchWords(sexp: Sexp): Array<string> {
  return matchList(sexp, matchSymbol)
}
