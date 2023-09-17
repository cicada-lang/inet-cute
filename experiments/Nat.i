type Nat { -- @Type }

node zero {
  ------
  value!: Nat
}

node add1 {
  prev: Nat
  ----------
  value!: Nat
}

node add {
  target!: Nat,
  addend: Nat
  --------
  return: Nat
}

rule zero add {
  @connect(^add->addend, ^add->return)
}

rule add1 add {
  @connect(
    add1(add(^add1->prev, ^add->addend)),
    ^add->return,
  )
}

claim one { -- Nat }

define one { add1(zero) }

claim two -- Nat end
define two one one add end

claim three -- Nat end
define three two one add end

claim four -- Nat end
define four two two add end

// To define `mul`, we first need `natErase` and `natDup`.

node natErase
  Nat :target!
  --------
end

rule zero natErase end

rule add1 natErase
  (add1)-prev natErase
end

node natDup
  Nat :target!
  --------
  Nat :second
  Nat :first
end

rule zero natDup
  zero first-(natDup)
  zero second-(natDup)
end

rule add1 natDup {
  let first, second = natDup(^add1->prev)
  @connect(add1(first), ^natDup->first)
  @connect(add1(second), ^natDup->second)
}

node mul
  Nat :target!
  Nat :mulend
  --------
  Nat :return
end

rule zero mul
  (mul)-mulend natErase
  zero return-(mul)
end

rule add1 mul
  (mul)-mulend natDup $first $second
  (add1)-prev first mul second add
  return-(mul)
end

// To define `max`, we need `maxAux`.

node maxAux
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
  (max)-second (add1)-prev maxAux
  return-(max)
end

rule zero maxAux
  (maxAux)-first add1
  return-(maxAux)
end

rule add1 maxAux
  (add1)-prev (maxAux)-first max
  add1 return-(maxAux)
end
