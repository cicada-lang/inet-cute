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

rule add zero
  (add)-addend
  (add)-result sole @connect
end

// The correct definition is:

// rule zero add
//   (add)-addend
//   (add)-result sole @connect
// end
