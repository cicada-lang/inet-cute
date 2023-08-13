[syntax] `Compose` as a statement

- preserved top level keywords:

  ```
  define claim
  type node rule
  begin check
  import require
  end
  ```

# net -- graph theory

extract `Net` from `Env`

- If a graph's node are connected via parts, we call it a net.

[builtin] `inspect` -- if the element is a port, print its connected component

[builtin] `run` -- only run the top port -- connected component

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

# module

support `private` statement prefix to define private aux nodes

support `import as` -- `Mod` as `Value`
