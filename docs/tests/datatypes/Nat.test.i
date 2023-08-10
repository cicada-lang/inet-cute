require "Nat.i"
require "Nat.i"
require "Nat.i" // Multiple `require` is fine.

begin zero zero add inspect run inspect end
begin two inspect run inspect end
begin four inspect run inspect end
begin zero one add inspect run inspect end


claim addadd Nat Nat Nat -- Nat end
define addadd add add end

begin one one one addadd run inspect end


begin two nat_erase zero inspect run inspect end
begin two nat_dup inspect run inspect end

begin two two mul inspect run inspect end
begin three three mul inspect run inspect end


begin zero two max run inspect end
begin one two max run inspect end
begin three two max run inspect end