require "List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList @Type -- @Type end

node diff {
  front: List('A),
  -------
  back: List('A),
  value!: DiffList('A),
}


node diffAppend
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :return
end

node diffOpen
  'A DiffList :target!
  'A List :list
  ----------
  'A List :return
end

rule diff diffAppend
  (diff)-front diff return-(diffAppend)
  (diffAppend)-rest diffOpen back-(diff)
end

rule diff diffOpen
  (diff)-back list-(diffOpen)
  (diff)-front return-(diffOpen)
end
