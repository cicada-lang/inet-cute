require "DiffList.i"
require "Trivial.i"

claim oneTwoSoles -- Trivial DiffList end

define oneTwoSoles {
  let [front, back, value1] = @spread(diff)
  @connect(front, cons(sole, back))
  let [front, back, value2] = @spread(diff)
  @connect(front, cons(sole, cons(sole, back)))
  diffAppend(value1, value2)
}

@inspect(oneTwoSoles)
@inspect(@run(oneTwoSoles))

claim twoTwoSoles -- Trivial DiffList end

define twoTwoSoles
  (diff) @spread $front sole cons sole cons front @connect
  (diff) @spread $front sole cons sole cons front @connect
  diffAppend
end

twoTwoSoles @inspect @run @inspect
