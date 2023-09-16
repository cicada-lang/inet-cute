require "Nat.i"
require "Nat.i"
require "Nat.i" // Multiple `require` is fine.

zero zero add @inspect @run @inspect
two @inspect @run @inspect
four @inspect @run @inspect
zero one add @inspect @run @inspect


claim addadd Nat Nat Nat -- Nat end
define addadd add add end

one one one addadd @run @inspect


two natErase zero @inspect @run @inspect
two natDup @inspect @run @inspect

two two mul @inspect @run @inspect
three three mul @inspect @run @inspect


zero two max @run @inspect
one two max @run @inspect
three two max @run @inspect
