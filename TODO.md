`node` always with both input and output

`TypeDefinition` build `arity` from `input` words

`NodeDefinition` -- has `input` and `output` words

build `Port` from `input` and `output` words -- use `Labeled` value

remove parser for `type`

`checkRule` -- by building local net

`wire` -- fix `cut`

`connect` -- fix `cut`

builtin stack function should check pop value is not undefined -- instead of using `as Value`

# value

`negative_signed_type` as a postfix builtin to create `SignedType` from `Type`

`Value` -- `Signed` -- any value can be signed

# interface

rename `show` to `begin` -- without `console.log`

`run` should be a builtin function -- does not consume value

`inspect` -- if the element is a port, print the whole env (for now)

`inspect` -- if the element is a port, print its connected component

# check

`rule` check node order

- The first node must have its principal port in the output,
  and the second node must have its principal port in the input.

[syntax] support `check ... then ... end`

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
