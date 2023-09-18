import Nat, zero, add1 from "./reuqire-more-rules-1.i"

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
