type Trivial -- @Type end
node sole -- Trivial :value! end

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
  (add)-result sole @connect
end

rule add1 add
  (add)-addend (add1)-prev add add1
  result-(add)
end
