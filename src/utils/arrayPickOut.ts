export function arrayPickOut<A>(array: Array<A>, i: number): A {
  const x = array[i]
  array.splice(i, 1)
  return x
}
