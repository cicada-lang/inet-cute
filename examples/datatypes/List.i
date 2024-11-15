type List @Type -- @Type end

node null
  --------
  'A List :value!
end

node cons
  'A :head
  'A List :tail
  --------
  'A List :value!
end

node append
  'A List :target!
  'A List :rest
  --------
  'A List :result
end

rule null append
  (append)-rest
  result-(append)
end

rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  result-(append)
end
