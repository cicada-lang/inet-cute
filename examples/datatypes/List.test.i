require "List.i"
require "Trivial.i"

claim sixSoles -- Trivial List end

define sixSoles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end

sixSoles @inspect @run @inspect
