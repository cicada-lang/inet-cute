move `utils/tightenWires` to `env/cleanUpWires`

move `env/remove*` to `utils/`

move `env/connect` -- to `utils/connect`

# check

[check] `ComposeOptions` take `checking: CheckingContext`

- with `substitution` and `typeVarCounters`

[check] `checkRule` -- by building local net

- call `compose` with `checking: CheckingContext`

[check] `checkType` -- check return type is just one `Type`

[maybe] remove `cut`

[check] `checkWords` -- `input` as preparing and `output` as clean up

- [maybe] We do not need `cut`, we can just check the words by building the net.

  this means we will have a dynamicly typed
  postfix general programming language
  as a macro system.

[check] `wire` -- fix `cut`

[check] `connect` -- fix `cut`

[check] builtin stack function should check pop value is not undefined -- instead of using `as Value`

[check] `checkRuleNodeOrder`

- The first node must have its principal port in the output,
  and the second node must have its principal port in the input.

[syntax] support `check ... then ... end`

# builtin

[builtin] `inspect` -- if the element is a port, print its connected component

[builtin] `run` -- only run the top port -- connected component

# module

design module system

- [maybe] when importing a node, also import all the rules about this node
- [maybe] suport defining node and type in one module, and defining rules in another module
- [maybe] learn from ruby module system

suport module system

re-org tests

# docs

update the article

new manual

# propaganda

reply the issue

post on v2ex

post on reddit

post on hackernews

share with tangentstorm

share on #forth

# learn

phase space and monoid -- understand the model theory of linear logic

coherent space -- understand the denotational semantics of linear logic

understand proof-nets for all connectives

- proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
- "The linear abstract machine", Lafont, 1990.
- "From proof-nets to interaction net", Lafont, 1995

# example

use inet to encode lambda calculus
