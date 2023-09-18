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

node add
  Nat :target!
  Nat :addend
  --------
  Nat :result
end

rule zero add
  (add)-addend
  result-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 result-(add)
end


claim one -- Nat end
define one zero add1 end

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

rule add1 natDup
  (add1)-prev natDup $first $second
  first add1 first-(natDup)
  second add1 second-(natDup)
end

node mul
  Nat :target!
  Nat :mulend
  --------
  Nat :result
end

rule zero mul
  (mul)-mulend natErase
  zero result-(mul)
end

rule add1 mul
  (mul)-mulend natDup $first $second
  (add1)-prev first mul second add
  result-(mul)
end

// To define `max`, we need `maxAux`.

node maxAux
  Nat :first
  Nat :second!
  --------
  Nat :result
end

node max
  Nat :first!
  Nat :second
  ----------
  Nat :result
end

rule zero max
  (max)-second result-(max)
end

rule add1 max
  (max)-second (add1)-prev maxAux
  result-(max)
end

rule zero maxAux
  (maxAux)-first add1
  result-(maxAux)
end

rule add1 maxAux
  (add1)-prev (maxAux)-first max
  add1 result-(maxAux)
end
