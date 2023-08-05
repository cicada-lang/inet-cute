# type

`cutWordDefinition` -- suport claim

- put reverse of claimed input to the stack (with +1 sign)
- check output of claimed output (with -1 sign)

`node` -- check type -- arity of defined types

`claim` -- improve error report -- print already claimed

`define` -- improve error report -- print already defined

# later

`claim` use `SignedType` as `input` and `output`

# unify

`unifyTypes` -- occur check

# example

Nat -- `mul` -- with `nat_dup` and `nat_erase`

Nat -- `max` -- with `max_aux`

# module

suport module system

- [maybe] when importing a node, also import all the rules about this node

suport defining node and type in one module, and defining rules in another module

# docs

update the article

new manual

# learn

phase space and monoid -- understand the model theory of linear logic

coherent space -- understand the denotational semantics of linear logic

understand proof-nets for all connectives

- proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
- "The linear abstract machine", Lafont, 1990.
- "From proof-nets to interaction net", Lafont, 1995

# value

the stack can take other types of values -- not only port

# example

use inet to encode lambda calculus
