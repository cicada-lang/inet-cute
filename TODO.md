# value

`formatValue` -- instead of `formatType`

`println` should be a builtin function -- `console.log(formatValue(...))`

test `TypeVar` by `println`

`composeDefinition` -- support `TypeDefinition`

`claim` -- has `input` and `output` words

`:label` should be a `Word` -- `Label`

`Value` -- `Signed` -- any value can be signed

`negative_sign` as a postfix builtin for negative `Signed`

`String` should be builtin type -- for `Labeled`

`Value` -- `Labeled` -- `value :label` should be of type `Labeled(value, "label")`

`NodeDefinition` -- has `input` and `output` words

`TypeDefinition` -- should have the same syntax as `claim`

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
