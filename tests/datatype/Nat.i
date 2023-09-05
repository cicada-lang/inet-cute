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
define one zero add1 end

claim two -- Nat end
define two one one add end

claim three -- Nat end
define three two one add end

claim four -- Nat end
define four two two add end

// To define `mul`, we first need `nat_erase` and `nat_dup`.

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

// To define `max`, we need `max_aux`.

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
