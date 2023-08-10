require "List.inet"

claim six_soles -- Trivial List end

define six_soles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end

begin six_soles inspect run inspect end
