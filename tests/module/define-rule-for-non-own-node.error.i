import Nat, zero, add1, add from "../datatype/Nat.i"

rule zero add
  (add)-addend
  result-(add)
end

rule add1 add
  (add)-addend (add1)-prev add add1
  result-(add)
end
