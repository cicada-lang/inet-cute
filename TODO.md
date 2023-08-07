# value

`Value` -- `Port` `PatternVar` `Type` `Labeled`

rename `Env.ports` to `Env.values`

merge `Ctx` to `Env`

the stack can take other types of values -- not only port

`'a` should be a value

`String` should be builtin type

`value :key` should be of type `Labeled("key", 'a)`

# check

`rule` check node order

- The first node must have its principal port in the output,
  and the second node must have its principal port in the input.

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

# monoid

[maybe] change project name to `monoid` -- `.mono` as file extension

update the syntax of "Type System as Homomorphism between Monoids"

copy example from "Type System as Homomorphism between Monoids"

copy example from study/adventure/jojo
