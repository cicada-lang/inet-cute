# check

`connect` call `matchSigns`

- only opposite signed types can be `connect`ed

`matchSigns` -- handle neutral sign -- need to search `env.wires`

[check] `checkType` -- check return type is just one `Type`

[check] `checkWords` -- `input` as preparing ports by types -- `output` as clean up ports on the stack by types

[refactor] `checkRule`

[mayb] replace `closeFreePorts` by `createInputPlaceholderPort`

[check] `connect` -- check `stack.pop` for `undefined`
[check] `swap` -- check `stack.pop` for `undefined`
[check] `rot` -- check `stack.pop` for `undefined`

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
