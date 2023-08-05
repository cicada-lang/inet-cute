update stmt names -- drop `Def` prefix

[maybe] [syntax] rename `define` to `fn`

# type

`define` -- can be a sequence of words that build a net

- need to design syntax to declare input and output types

  ```inet
  define <name>: ...<output> do
    ...
  end

  define <name>: ...<input> -- ...<output> do
    ...
  end
  ```

[syntax] `fn_args` suport optional `,`

`node` -- check type -- arity of defined types

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
