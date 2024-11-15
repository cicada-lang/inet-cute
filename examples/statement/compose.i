type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

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
  (add)-addend (add1)-prev add add1
  result-(add)
end

zero add1 add1 @inspect
@run @inspect
