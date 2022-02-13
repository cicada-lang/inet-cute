- model interaction nets

- use `Net.portStack` to build `Net`

# Design Syntax

## How to build net?

Use postfix notation to build a net.

``` cicada-vm
zero ( -- *nat )
add1 ( nat -- *nat )
add ( nat *nat -- nat )
```

Build a net.

``` cicada-vm
zero add1 zero add1 add ( -- nat )
```

## How to write rule?

A rule specify how to disconnect and reconnect,
based on a matching active pair.

``` cicada-vm
zero * add =>
add1 * add => add add1
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

``` cicada-vm
k0 ( -- *x )
k1 ( x -- *x )
apply ( arg *fun -- ret )
```

``` cicada-vm
k0 apply => k1
k1 apply => drop
```

## Circle

``` cicada-vm
diff ( *list end -- diff-list )
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

``` cicada-vm
wire diff

wire 3 cons diff
wire 2 cons 1 cons diff
append
```

In non stack-based syntax,
handling multiple return values will be unnatural.

``` cicada-vm
let x = wire

diff(x, x)
```

``` cicada-vm
let x = wire
let y = wire

append(
  diff(cons(1, cons(2, x)), x)
  diff(cons(3, y), y))
```
