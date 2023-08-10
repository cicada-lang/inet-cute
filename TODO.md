# check

[check] `checkRuleNodeOrder`

- The first node must have its principal port in the output,
  and the second node must have its principal port in the input.

[check] `checkWords`

- `input` as preparing ports by types
- `output` as clean up ports on the stack by types

`Begin` use `checking` -- only no `checking` in `run`, others can have `checking`

`Check` as a statement -- like unnamed `claim` + `define`

[syntax] support `check ... then ... end`

[check] `checkType` -- check return type is just one `Type`

[check] `checkNode` -- check `input` and `output` words of node definition

- runtime type checking based on type definition
- check that each node has one and only one principal port

# module

`Import` as a statement

[syntax] `Import` -- `import <name>, ... from "<path>"`

[maybe] support `require` to import all

re-org tests

clean up old tests

# graph

[builtin] `inspect` -- if the element is a port, print its connected component

[builtin] `run` -- only run the top port -- connected component

# inet-canvas

a package for draw inet on canvas

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
