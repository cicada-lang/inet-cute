---
title: Programming with Interaction Nets
author: Xie Yuheng
year: 2023
---

# 1

At the end of 2021,
I occasionally read a 1990 paper "Interaction Nets",
by Yves Lafont.
The paper introduced a very interesting new computation model,
using graph of nodes and edges as data,
and viewing interaction between connected nodes as computation.

In this paper, I will follow Lafont's examples
to introduce the principal of interaction nets.
And I will also introduce a language I designed
to practice this computation model.

My language's main contribution to interaction nets,
is to use stack and postfix notation to build nets.

What is stack? What is postfix notation? How to build nets?

Read this paper to see detailed explanation :)

# 2

How to use graph to encode data?

Suppose we want to encode the simplest data -- natural number.
We can mimic the ancient knot counting, using node to do the counting.

```
0  (zero)--
1  (zero)--(add1)--
2  (zero)--(add1)--(add1)--
3  (zero)--(add1)--(add1)--(add1)--
```

The node representing 0 `(zero)` has one port,
the node representing +1 `(add1)` has two ports,
we can encode natural number
by connecting these nodes through the ports.

# 3

How to use graph to represent functions that operate on natural numbers?

Take addition as an example, we need to introduce a new node to represent addition,
and to define interaction rules between this node and other nodes.

We use a node with three ports to represent addition.

```
       |
     (add)
     /   \
```

The two ports below represent the input `target` number and the `addend`,
the port above represent the output `value`.

```
     value
       |
     (add)
     /   \
 target  addend
```

We can represent 0 + 1 as the following:

```
       |
     (add)
     /   \
(zero)   (add1)
           |
         (zero)
```

and 2 + 2 as the following:

```
       |
     (add)
     /   \
(add1)   (add1)
  |        |
(add1)   (add1)
  |        |
(zero)   (zero)
```

By defining the interaction rules between `(add)` and neighbor nodes,
we can do addition.

When the `target` port of `(add)`is connected with `(zero)`,
delete `(zero)` and `(add)`,
and connect the `value` of `(add)` with the `addend` of `(add)` directly.

```
     value           value
       |               |
     (add)     =>      |
     /   \              \
(zero)   addend        addend
```

When the `target` port of `(add)` is connected with `(add1)`,
move `(add1)` above `(add)`.

```
     value           value
       |               |
     (add)     =>    (add1)
     /   \             |
(add1)   addend      (add)
  |                  /   \
prev              prev   addend
```

By these two interaction rules, the graph representing 2 + 2
will become 4 through the following interaction:

```
       |                  |                 |            |
     (add)              (add1)            (add1)       (add1)
     /   \                |                 |            |
(add1)   (add1)         (add)             (add1)       (add1)
  |        |    =>      /   \      =>       |       =>   |
(add1)   (add1)    (add1)   (add1)        (add)        (add1)
  |        |         |        |           /   \          |
(zero)   (zero)    (zero)   (add1)   (zero)   (add1)   (add1)
                              |                 |        |
                            (zero)            (add1)   (zero)
                                                |
                                              (zero)
```

# 4

Let's design a programming language
to practice this computation model.

In our language each node has fixed number of ports.

```
(zero) // has one port
(add1) // has two ports
(add)  // has three ports
```

Every port has a name.

```
(zero)-value  // the value of 0

(add1)-prev   // previous number
(add1)-value  // the value of +1

(add)-target  // target number
(add)-addend  // the number to be added
(add)-return  // result of addition
```

There are two kinds of ports -- input ports and output ports.

```
-------------
(zero)-value   // output port

(add1)-prev    // input port
-------------
(add1)-value   // output port

(add)-target   // input port
(add)-addend   // input port
-------------
(add)-return   // output port
```

Two nodes can be connected through ports,
an input port must be connected to an output port.

Take the graph representing 2 as an example:

```
(zero)--(add1)--(add1)--
```

The detailed connections are the following:

```
(zero)-value prev-(add1)
(add1)-value prev-(add1)
(add1)-value // not yet connected free port
```

Each node has one and only one principal port,
two nodes can interact only when they are
connected through two principal ports.

```
-------------
(zero)-value!   // principal port

(add1)-prev
-------------
(add1)-value!   // principal port

(add)-target!   // principal port
(add)-addend
-------------
(add)-return
```

We also require each port to have a specific type,
and only ports with matching types can be connected.

We design the statement to define node as follows:

- The statement starts with `node`,
  follows the name of the node,
  ends with `end`.
- Use a dividing line to distinguish the input ports from the output ports.
  - Above the dividing line are the input ports.
  - Below the dividing line are the output ports.
  - The dividing can be as long as wish, at least two characters `--`.
- The name of a port is written after the type as a label.
- For principal port, add `!` as suffix.

Suppose the type representing natural number is `Nat`,
the aforementioned nodes are defined as follows:

```
node zero
  --------
  Nat :value!
end

node add1
  Nat :prev
  --------
  Nat :value!
end

node add
  Nat :target!
  Nat :prev
  --------
  Nat :return
end
```

# 5

A type might have other types as arguments.

For now, the only information we need is the number of input arguments,
because the type of an argument must be a type,
and the number of output arguments must be one.

But to be consistent with the definition of node,
we design the statement to define type as follows:

- The statement starts with `type`,
  follows the name of the type,
  ends with `end`.
- Use a dividing line to distinguish the input type arguments from the output type arguments.
  - Above the dividing line are the input type arguments (must be `Type`).
  - Below the dividing line are the output type arguments, (must be one `Type`).
  - The dividing can be as long as wish, at least two characters `--`.
  - `Type` is a built-in value, we reference it by `@Type`.
    - All built-in definitions will use `@` as prefix.

Take the type representing natural number `Nat` as an example, it has no input type arguments, thus it's definition is:

```
type Nat -- @Type end
```

Take `List` as another example, it has one input type argument, i.e. the element type, thus it's definition is:

```
type List @Type -- @Type end
```

# 6

Given two nodes, we can define an interaction rule for them.

Let's review the interaction rule between `(add1)` and `(add)`:

```
     return          value
       |               |
     (add)     =>    (add1)
     /   \             |
(add1)   addend      (add)
  |                  /   \
prev            target   addend
```

We can see that, the so called interaction can be viewed as:

- Remove the edge between the two principal ports.
- Remove the two nodes matched by the rule, at this point, the ports
  originally connected to these two nodes will be exposed.
- Reconnect the exposed ports, during which we can introduce new nodes.

We design the statement for defining rule as follows:

- The statement starts with `rule`,
  follows the name of two ports,
  ends with `end`.
- Use a stack for temporarily saving the ports.
- Use the word `(node)-port`
  to reference a exposed port caused by removing a port of a node,
  and put the exposed port on the stack.
- Use the word `port-(node)`
  also to reference a exposed port caused by removing a port of a node,
  and connect the exposed port with the port at the top of the stack.
- Use the word `(node)` to call a node,
  and connect the input ports of this node with the ports at the top
  of the stack in order, each input port will use up a port in the
  stack, and then put the output ports of this node back into the
  stack in order.

The the rule between `(add1)` and `(add)` as an example:

```
rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end
```

Let's analyze the above definition,
show the stack at each step,
also show the newly generated node
and newly generated connections at each step.

- For the newly generated nodes by calling a node name,
  we add subscripts to them to distinguish them from each other.
- Note that, the `(add)-addend` without subscript
  does not represent the `addend` port of `(add)`,
  but represent the exposed port caused by
  removing the `addend` port of `(add)`.

```
  stack: [ ]

(add)-addend

  stack: [ (add)-addend ]

(add1)-prev

  stack: [ (add)-addend, (add1)-prev ]

add

  new node: (add₂)

  new connections:
    (add1)-prev target-(add₂)
    (add)-addend addend-(add₂)

  stack: [ (add₂)-return ]

add1

  new node: (add1₂)

  new connections:
    (add₂)-return prev-(add1₂)

  stack: [ (add1₂)-value ]

return-(add)

  stack: [ ]
```

The rule between `(zero)` and `(add)` is a little special,
because during reconnecting the exposed ports,
it does not introduce any new nodes.

```
rule zero add
  (add)-addend
  return-(add)
end
```

# 7

Using the statements designed above,
we can write a complete code example.

In which we used `define` to define new words,
and before using `define` to define a new word,
we must use `claim` to claim the type of the word.

We have an online playground, which can be used to easily share code.

[Goto the playground of `Nat` and `(add)`](https://inet.run/playground/dHlwZSBOYXQgLS0gQFR5cGUgZW5kCgpub2RlIHplcm8KICAtLS0tLS0tLS0tLS0KICBOYXQgOnZhbHVlIQplbmQKCm5vZGUgYWRkMQogIE5hdCA6cHJldgogIC0tLS0tLS0tLS0tLQogIE5hdCA6dmFsdWUhCmVuZAoKbm9kZSBhZGQKICBOYXQgOnRhcmdldCEKICBOYXQgOmFkZGVuZAogIC0tLS0tLS0tLS0tLQogIE5hdCA6cmV0dXJuCmVuZAoKcnVsZSB6ZXJvIGFkZAogIChhZGQpLWFkZGVuZAogIHJldHVybi0oYWRkKQplbmQKCnJ1bGUgYWRkMSBhZGQKICAoYWRkKS1hZGRlbmQKICAoYWRkMSktcHJldiBhZGQKICBhZGQxIHJldHVybi0oYWRkKQplbmQKCmNsYWltIG9uZSAtLSBOYXQgZW5kCgpkZWZpbmUgb25lCiAgemVybyBhZGQxCmVuZAoKY2xhaW0gdHdvIC0tIE5hdCBlbmQKCmRlZmluZSB0d28KICBvbmUgYWRkMQplbmQKCmNsYWltIGFkZF90d28gTmF0IC0tIE5hdCBlbmQKCmRlZmluZSBhZGRfdHdvCiAgdHdvIGFkZAplbmQKCm9uZSBhZGRfdHdvCm9uZSBhZGRfdHdvCmFkZA)

```
type Nat -- @Type end

node zero
  ------------
  Nat :value!
end

node add1
  Nat :prev
  ------------
  Nat :value!
end

node add
  Nat :target!
  Nat :addend
  ------------
  Nat :return
end

rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end

claim one -- Nat end

define one
  zero add1
end

claim two -- Nat end

define two
  one add1
end

claim add_two Nat -- Nat end

define add_two
  two add
end

one add_two
one add_two
add
```

# 8

We emphasize the constraints of interaction nets, as a computational
model some of the good properties of interaction nets are gained by
these constraints.

The first constraint is, given two nodes,
we can define at most one interaction rule.

That is to say, when we find two nodes are connected through two
principal ports, either we can not find a rule for these two nodes,
then the two nodes can not interact; or we can find one and only one
rule, the two nodes will interact according to this rule.

This constraint excluded the case of finding multiple rules,
and need to making choice between them.

The second constraint is, each node has one and only one principal port.

Suppose two nodes are connected through two principal ports.
We draw a circle to enclose these two nodes and the edge between the principal ports.
Because each node has one and only one principal port,
all edges can go across the circle are not edge connecting principal ports.
These kind of edges can not interact at all.

```
     \   |   /
  .-------------.
  |    \ | /    |
  |   (.....)   |
  |      |      |
  |   (.....)   |
  |    / | \    |
  `-------------`
     /   |   \
```

Although during an interaction between two nodes, new nodes and new
interactable edges might be introduced, all of the new interactable
edges can still be viewed as contained within the circle, during all
the new future interactions caused by them, removing and reconnecting
will not affect other parts of the graph outside the circle.

That is to say, in interaction nets,
all interactions are independent,
first do interaction here or there
will not affect the final result of the computation.

If the sequence of interactions at different place is ignored,
then in interaction nets, not only the result of the computation
is unique, the process of computation is also unique!

When implementing interaction nets,
if the computer as multiple cores,
we can start multiple threads,
sharing the same memory,
do the interactions at different place in parallel,
the threads will not interfere with each other.

# 9

Every node has one and only one principal port,
this constraint can bring good properties to our computation model,
but it also make programming inconvenient.

The max function of natural number is an example of such inconvenience.
Let's introduce a node `(max)` for this function.

```
     return
       |
     (max)
     /    \
first!   second
```

Node definition:

```
node max
  Nat :first!
  Nat :second
  ----------
  Nat :return
end
```

The interaction between `(zero)` and `(zero)` is simple:

```
     return         return
       |              |
     (max)      =>    |
     /    \            \
(zero)   second       second
```

Rule definition:

```
rule zero max
  (max)-second return-(max)
end
```

For the `(add1)` and `(zero)`,
if there is no single-principal-port constraint,
we can imagine the following interaction:

```
     return           return
       |                |
     (max)      =>    (add1)
     /    \             |
(add1)    (add1)      (max)
   |        |         /   \
 prev      prev    prev   prev
```

But because of single-principal-port constraint,
we have to introduce an auxiliary node and some auxiliary rules,
to explicitly choose between two interactable edges.

We call the auxiliary node `(max_aux)`.

```
     return
       |
   (max_aux)
     /    \
first    second!
```

Node definition:

```
node max_aux
  Nat :first
  Nat :second!
  --------
  Nat :return
end
```

Using the auxiliary node to define
the rule between `(add1)` and `(max)`:

```
     return            return
       |                 |
     (max)      =>   (max_aux)
     /    \            /   \
(add1)   second     prev   second
   |
 prev
```

Rule definition:

```
rule add1 max
  (max)-second
  (add1)-prev max_aux
  return-(max)
end
```

The rule between `(zero)` and `(max_aux)`:

```
     return            return
       |                 |
   (max_aux)     =>    (add1)
     /    \              |
 first   (zero)        first
```

Rule definition:

```
rule zero max_aux
  (max_aux)-first add1
  return-(max_aux)
end
```

The rule between `(add1)` and `(max_aux)`:

```
     return            return
       |                 |
   (max_aux)     =>    (add1)
     /    \              |
 first   (add1)        (max)
           |           /   \
          prev     first   prev
```

Rule definition:

```
rule add1 max_aux
  (add1)-prev
  (max_aux)-first max
  add1 return-(max_aux)
end
```

[Goto the playground of `Nat` and `(max)`](https://inet.run/playground/dHlwZSBOYXQgLS0gQFR5cGUgZW5kCgpub2RlIHplcm8KICAtLS0tLS0KICBOYXQgOnZhbHVlIQplbmQKCm5vZGUgYWRkMQogIE5hdCA6cHJldgogIC0tLS0tLS0tLS0KICBOYXQgOnZhbHVlIQplbmQKCm5vZGUgbWF4X2F1eAogIE5hdCA6Zmlyc3QKICBOYXQgOnNlY29uZCEKICAtLS0tLS0tLQogIE5hdCA6cmV0dXJuCmVuZAoKbm9kZSBtYXgKICBOYXQgOmZpcnN0IQogIE5hdCA6c2Vjb25kCiAgLS0tLS0tLS0tLQogIE5hdCA6cmV0dXJuCmVuZAoKcnVsZSB6ZXJvIG1heAogIChtYXgpLXNlY29uZCByZXR1cm4tKG1heCkKZW5kCgpydWxlIGFkZDEgbWF4CiAgKG1heCktc2Vjb25kIChhZGQxKS1wcmV2IG1heF9hdXgKICByZXR1cm4tKG1heCkKZW5kCgpydWxlIHplcm8gbWF4X2F1eAogIChtYXhfYXV4KS1maXJzdCBhZGQxCiAgcmV0dXJuLShtYXhfYXV4KQplbmQKCnJ1bGUgYWRkMSBtYXhfYXV4CiAgKGFkZDEpLXByZXYgKG1heF9hdXgpLWZpcnN0IG1heAogIGFkZDEgcmV0dXJuLShtYXhfYXV4KQplbmQKCmNsYWltIG9uZSAtLSBOYXQgZW5kCmRlZmluZSBvbmUgemVybyBhZGQxIGVuZAoKY2xhaW0gdHdvIC0tIE5hdCBlbmQKZGVmaW5lIHR3byBvbmUgYWRkMSBlbmQKCmNsYWltIHRocmVlIC0tIE5hdCBlbmQKZGVmaW5lIHRocmVlIHR3byBhZGQxIGVuZAoKY2xhaW0gZm91ciAtLSBOYXQgZW5kCmRlZmluZSBmb3VyIHRocmVlIGFkZDEgZW5kCgp6ZXJvIHR3byBtYXgKCnRocmVlIHR3byBtYXg)

```
type Nat -- @Type end

node zero
  ------
  Nat :value!
end

node add1
  Nat :prev
  ----------
  Nat :value!
end

node max_aux
  Nat :first
  Nat :second!
  --------
  Nat :return
end

node max
  Nat :first!
  Nat :second
  ----------
  Nat :return
end

rule zero max
  (max)-second return-(max)
end

rule add1 max
  (max)-second (add1)-prev max_aux
  return-(max)
end

rule zero max_aux
  (max_aux)-first add1
  return-(max_aux)
end

rule add1 max_aux
  (add1)-prev (max_aux)-first max
  add1 return-(max_aux)
end

claim one -- Nat end
define one zero add1 end

claim two -- Nat end
define two one add1 end

claim three -- Nat end
define three two add1 end

claim four -- Nat end
define four three add1 end

zero two max

three two max
```

# 10

我们已经分析了代表加法的节点 `(add)`，
下面我们来分析代表乘法的节点 `(mul)`。

我们将会发现，为了定义 `(mul)` 与 `(zero)` 和 `(add1)` 之间的反应规则，
我们又要引入两个新的辅助节点：

- `(nat_erase)` 删除一个自然数。
- `(nat_dup)` 复制一个自然数。

这两个节点与之前的所有节点都不一样，
之前的所有节点都有一个输出节点，
然而：

- `(nat_erase)` 有零个输出节点。
- `(nat_dup)` 有两个输出节点。

这其实是我们使用栈来构造网的主要原因。

使用栈的好处之一是，
可以自然地处理零个返回值和多个返回值的节点，
而不必为它们设计新的特殊的语法。

决定使用栈来构造网之后，就进而决定使用纯粹的后缀表达式作为语法。
这样的零一个好处是，词之间复合具有结合性，
因此当我们想要把一个词的定义中的一部分切分出来，定义成新的词时，
不用考虑那么多语法上相互影响的地方。

下面我们就不用 ASCII 画图了，
点开去演算场的连接，
就可以看到自动渲染出来的图。

在下面的代码中，我们用了一个新的语法关键词 `import` 来从其他模块中引入定义。

- 一个文件对应一个模块。
- 用 `.i` 作为文件名后缀。
- 可以使用完整的 URL `https//...` 来指定文件，
  也可以使用相对路径 `./...` 来指定文件。

我们还用了一种新的词 `$local` 来将栈顶的值保存到名为 `local` 的局部变量中。

- 用 `$local` 保存一个值之后，可以通过调用 `local` 来取出这个值。
- 取出之后，`$local` 就空了，就又可以用于保存新的值了。

[去 `Nat` 与 `(mul)` 的演算场](https://inet.run/playground/aW1wb3J0CiAgTmF0LCB6ZXJvLCBhZGQxLCBhZGQsCiAgb25lLCB0d28sIHRocmVlLApmcm9tICJodHRwczovL2Nkbi5pbmV0LnJ1bi90ZXN0cy9kYXRhdHlwZS9OYXQuaSIKCm5vZGUgbmF0X2VyYXNlCiAgTmF0IDp0YXJnZXQhCiAgLS0tLS0tLS0KZW5kCgpydWxlIHplcm8gbmF0X2VyYXNlIGVuZAoKcnVsZSBhZGQxIG5hdF9lcmFzZQogIChhZGQxKS1wcmV2IG5hdF9lcmFzZQplbmQKCm5vZGUgbmF0X2R1cAogIE5hdCA6dGFyZ2V0IQogIC0tLS0tLS0tCiAgTmF0IDpzZWNvbmQKICBOYXQgOmZpcnN0CmVuZAoKcnVsZSB6ZXJvIG5hdF9kdXAKICB6ZXJvIGZpcnN0LShuYXRfZHVwKQogIHplcm8gc2Vjb25kLShuYXRfZHVwKQplbmQKCnJ1bGUgYWRkMSBuYXRfZHVwCiAgKGFkZDEpLXByZXYgbmF0X2R1cCAkZmlyc3QgJHNlY29uZAogIGZpcnN0IGFkZDEgZmlyc3QtKG5hdF9kdXApCiAgc2Vjb25kIGFkZDEgc2Vjb25kLShuYXRfZHVwKQplbmQKCm5vZGUgbXVsCiAgTmF0IDp0YXJnZXQhCiAgTmF0IDptdWxlbmQKICAtLS0tLS0tLQogIE5hdCA6cmV0dXJuCmVuZAoKcnVsZSB6ZXJvIG11bAogIChtdWwpLW11bGVuZCBuYXRfZXJhc2UKICB6ZXJvIHJldHVybi0obXVsKQplbmQKCnJ1bGUgYWRkMSBtdWwKICAobXVsKS1tdWxlbmQgbmF0X2R1cCAkZmlyc3QgJHNlY29uZAogIChhZGQxKS1wcmV2IGZpcnN0IG11bCBzZWNvbmQgYWRkCiAgcmV0dXJuLShtdWwpCmVuZAoKdHdvIG5hdF9kdXAgJGZpcnN0ICRzZWNvbmQKCnR3byB0d28gbXVsCgp0aHJlZSB0aHJlZSBtdWw)

```
import
  Nat, zero, add1, add,
  one, two, three,
from "https://cdn.inet.run/tests/datatype/Nat.i"

node nat_erase
  Nat :target!
  --------
end

rule zero nat_erase end

rule add1 nat_erase
  (add1)-prev nat_erase
end

node nat_dup
  Nat :target!
  --------
  Nat :second
  Nat :first
end

rule zero nat_dup
  zero first-(nat_dup)
  zero second-(nat_dup)
end

rule add1 nat_dup
  (add1)-prev nat_dup $first $second
  first add1 first-(nat_dup)
  second add1 second-(nat_dup)
end

node mul
  Nat :target!
  Nat :mulend
  --------
  Nat :return
end

rule zero mul
  (mul)-mulend nat_erase
  zero return-(mul)
end

rule add1 mul
  (mul)-mulend nat_dup $first $second
  (add1)-prev first mul second add
  return-(mul)
end

two nat_dup $first $second

two two mul

three three mul
```

# 11

下面我们在自然数 `Nat` 这个最简单的数据之后，
介绍几乎是第二简单的数据 -- 链表 `List`。

主要实现一个 `append` 函数，来将两个链表连接起来。

在演算场中渲染出来的图中，
我们可以明显看到 `List` 的 `(append)`
与 `Nat` 的 `(add)` 非常相似。
差异是 `Nat` 的 `(add1)` 只是单纯地增加一个节点，
而 `List` 的 `(cons)` 在增加一个节点的同时，
还连接到了一个额外的节点。

在下面的代码中，我们有使用了一个新的词 `'A`。

- `'A` 会将 `A` 这个符号放入栈中。
- `'A` 可以用做类型变元。
- 类型变元可以作为类型参数，比如 `'A List`。

在定义 `(cons)` 和 `(append)` 时，代表类型变元的相同的符号 `'A`，出现了多次。
这意味着在连接这些节点的接口时，这个类型变元必须匹配到相同的类型。

[去 `List` 与 `(append)` 的演算场](https://inet.run/playground/dHlwZSBMaXN0IEBUeXBlIC0tIEBUeXBlIGVuZAoKbm9kZSBudWxsCiAgLS0tLS0tLS0KICAnQSBMaXN0IDp2YWx1ZSEKZW5kCgpub2RlIGNvbnMKICAnQSA6aGVhZAogICdBIExpc3QgOnRhaWwKICAtLS0tLS0tLQogICdBIExpc3QgOnZhbHVlIQplbmQKCm5vZGUgYXBwZW5kCiAgJ0EgTGlzdCA6dGFyZ2V0IQogICdBIExpc3QgOnJlc3QKICAtLS0tLS0tLQogICdBIExpc3QgOnJldHVybgplbmQKCnJ1bGUgbnVsbCBhcHBlbmQKICAoYXBwZW5kKS1yZXN0CiAgcmV0dXJuLShhcHBlbmQpCmVuZAoKcnVsZSBjb25zIGFwcGVuZAogIChhcHBlbmQpLXJlc3QgKGNvbnMpLXRhaWwgYXBwZW5kCiAgKGNvbnMpLWhlYWQgY29ucwogIHJldHVybi0oYXBwZW5kKQplbmQKCmltcG9ydCB6ZXJvIGZyb20gImh0dHBzOi8vY2RuLmluZXQucnVuL3Rlc3RzL2RhdGF0eXBlL05hdC5pIgoKbnVsbCB6ZXJvIGNvbnMgemVybyBjb25zCm51bGwgemVybyBjb25zIHplcm8gY29ucwphcHBlbmQKCm51bGwgemVybyBjb25zIHplcm8gY29ucwpudWxsIHplcm8gY29ucyB6ZXJvIGNvbnMKYXBwZW5kIEBydW4gJHJlc3VsdA)

```
type List @Type -- @Type end

node null
  --------
  'A List :value!
end

node cons
  'A :head
  'A List :tail
  --------
  'A List :value!
end

node append
  'A List :target!
  'A List :rest
  --------
  'A List :return
end

rule null append
  (append)-rest
  return-(append)
end

rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  return-(append)
end

import zero from "https://cdn.inet.run/tests/datatype/Nat.i"

null zero cons zero cons
null zero cons zero cons
append

null zero cons zero cons
null zero cons zero cons
append @run $result
```

# 12

想要用 `(append)` 将两个 `List` 连接起来，
需要遍历 `(append)` 的 `target`，
一步一步构造一个新的链表连，
接到 `(append)` 的 `rest` 前面。

这样，运算所需要的时间与前一个链表的长度成正比。
可不可以将前一个链表直接与后一个链表连接起来呢？
这样应该只需要固定的几步就可以完成计算。

我们可以定义一个新的数据类型 `DiffList`，
和一个新的节点 `diff_list`，
这个节点用来可以抓着一个 `List` 的头和尾。
如果有两个 `DiffList`，
只要把第一个 `diff_list` 抓着的尾，
和第二个 `diff_list` 抓着的头相连即可。

注意，在一般的程序语言中，经常用树状结构的表达式来作为数据，
从树的父节点可以找到子节点，但是反之不行。
而在反应网中，所有节点之间的关系是对称的。

在下面的代码中，在一次调用 `cons` 时，
我们写成了 `(cons :tail)` 而不是直接写 `cons`，
这代表在调用这个节点之前，重新排列这个节点的接口，
将原本是输入接口的 `:tail` 作为输出接口。

在下面的代码中我们还使用了一个短语：

```
... $value @connect value ...
```

它的意思是，先把栈顶的值保存在 `$value` 中，
然后将栈顶的两个接口相连，
最后再把保存在 `$value` 中的值放回栈中。

[去 `DiffList` 与 `(diff_append)` 的演算场](https://inet.run/playground/aW1wb3J0IExpc3QgZnJvbSAiaHR0cHM6Ly9jZG4uaW5ldC5ydW4vdGVzdHMvZGF0YXR5cGUvTGlzdC5pIgoKdHlwZSBEaWZmTGlzdCBAVHlwZSAtLSBAVHlwZSBlbmQKCm5vZGUgZGlmZgogICdBIExpc3QgOmZyb250CiAgLS0tLS0tLQogICdBIExpc3QgOmJhY2sKICAnQSBEaWZmTGlzdCA6dmFsdWUhCmVuZAoKbm9kZSBkaWZmX2FwcGVuZAogICdBIERpZmZMaXN0IDp0YXJnZXQhCiAgJ0EgRGlmZkxpc3QgOnJlc3QKICAtLS0tLS0tLQogICdBIERpZmZMaXN0IDpyZXR1cm4KZW5kCgpub2RlIGRpZmZfb3BlbgogICdBIERpZmZMaXN0IDp0YXJnZXQhCiAgJ0EgTGlzdCA6bGlzdAogIC0tLS0tLS0tLS0KICAnQSBMaXN0IDpyZXR1cm4KZW5kCgpydWxlIGRpZmYgZGlmZl9hcHBlbmQKICAoZGlmZiktZnJvbnQgZGlmZiByZXR1cm4tKGRpZmZfYXBwZW5kKQogIChkaWZmX2FwcGVuZCktcmVzdCBkaWZmX29wZW4gYmFjay0oZGlmZikKZW5kCgpydWxlIGRpZmYgZGlmZl9vcGVuCiAgKGRpZmYpLWJhY2sgbGlzdC0oZGlmZl9vcGVuKQogIChkaWZmKS1mcm9udCByZXR1cm4tKGRpZmZfb3BlbikKZW5kCgppbXBvcnQgemVybyBmcm9tICJodHRwczovL2Nkbi5pbmV0LnJ1bi90ZXN0cy9kYXRhdHlwZS9OYXQuaSIKaW1wb3J0IGNvbnMgZnJvbSAiaHR0cHM6Ly9jZG4uaW5ldC5ydW4vdGVzdHMvZGF0YXR5cGUvTGlzdC5pIgoKemVybyAoY29ucyA6dGFpbCkgemVybyBjb25zIGRpZmYgJHZhbHVlIEBjb25uZWN0IHZhbHVlCnplcm8gKGNvbnMgOnRhaWwpIHplcm8gY29ucyBkaWZmICR2YWx1ZSBAY29ubmVjdCB2YWx1ZQpkaWZmX2FwcGVuZAoKemVybyAoY29ucyA6dGFpbCkgemVybyBjb25zIGRpZmYgJHZhbHVlIEBjb25uZWN0IHZhbHVlCnplcm8gKGNvbnMgOnRhaWwpIHplcm8gY29ucyBkaWZmICR2YWx1ZSBAY29ubmVjdCB2YWx1ZQpkaWZmX2FwcGVuZCBAcnVuICRyZXN1bHQ)

```
import List from "https://cdn.inet.run/tests/datatype/List.i"

type DiffList @Type -- @Type end

node diff
  'A List :front
  -------
  'A List :back
  'A DiffList :value!
end

node diff_append
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :return
end

node diff_open
  'A DiffList :target!
  'A List :list
  ----------
  'A List :return
end

rule diff diff_append
  (diff)-front diff return-(diff_append)
  (diff_append)-rest diff_open back-(diff)
end

rule diff diff_open
  (diff)-back list-(diff_open)
  (diff)-front return-(diff_open)
end

import zero from "https://cdn.inet.run/tests/datatype/Nat.i"
import cons from "https://cdn.inet.run/tests/datatype/List.i"

zero (cons :tail) zero cons diff $value @connect value
zero (cons :tail) zero cons diff $value @connect value
diff_append

zero (cons :tail) zero cons diff $value @connect value
zero (cons :tail) zero cons diff $value @connect value
diff_append @run $result
```

# 13

反应网介绍完了。

下面我们回顾一下，再展望一下。

## 并行计算

这个计算模型确实有趣，在其中任何一步计算都可以相互独立地进行，
因此非常适合用并行计算的方式来实现。

## 非线性计算模型的语法

用栈与后缀表达式来构造非线性的网，也算是一种很简洁的语法。

其实对于反应网这样的，基于图论的计算模型来说，图本身才是语法。
但是图是非线性的，为了用线性的文本去描述图，
我们使用栈和后缀表达式来构造图。

这样，用于构造图的语言，其实就成了反应网这个语言下面一层的语言。
把这个语言本身视为程序语言，也是图灵完备的。

这种想法不单单能够用来构造图，为基于图论的计算模型提供语法，
也可以用来构造更复杂的非线性对象，比如图论在高维度的推广
-- 胞腔复形 [Cell complex](https://zh.wikipedia.org/wiki/CW%E5%A4%8D%E5%BD%A2)，
假使我们有一个基于胞腔复形的新的计算模型，
那么用栈与后缀表达式来为计算模型提供语法的方案依然适用。

## 类型系统

另外我们的语言也有类型系统，类型检查的过程，其实就是运行这个底层语言的过程，
只要在连接节点的时候，检查两个接口的类型是否匹配就可以了。

在我们这个语言的类型系统中，类型的参数必须是类型，
但是其实也可以想象，让类型的参数也可以是任意的值，
即所谓的依赖类型 [Dependent type](https://en.wikipedia.org/wiki/Dependent_type)。

此时我们需要判断两个类型是否匹配就更困难了，
因为需要判断两个可能带有任意计算的值是否相等。

在一般的计算模型，比如 Lambda 演算中，
实现这种判断非常困难，但是在反应网中，
实现这种判断是相对简单的，
因为只要判断经过所有可能的反应之后，
两个指定了一个节点的图是否同构。

## 成为实用的程序语言

在纯粹的反应网中，数据只有点和边构成的图，
想要编码自然数都要用结绳计数，
在很多实用场景下，这显然是不实用的。

但是我们的语言已经分成了两层，
上面一层是纯粹的反应网，
底下一层栈与后缀表达式的通用程序语言。
通过扩展这个底层语言，我们就可以让整个语言变成一个实用的语言。

预知具体设计如何，且看我下回项目之分解。
