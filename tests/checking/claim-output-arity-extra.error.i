type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

type Trivial -- @Type end
node sole -- Trivial :value! end

claim add2 Nat -- Nat Nat end
define add2 add1 add1 end
