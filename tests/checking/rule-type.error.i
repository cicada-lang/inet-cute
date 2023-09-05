type Trivial -- @Type end
node sole -- Trivial :value! end

type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

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
  (add)-addend (add1)-prev add sole add1
  return-(add)
end
