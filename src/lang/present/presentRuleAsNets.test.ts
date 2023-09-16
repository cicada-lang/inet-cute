import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentRuleAsNets } from "./presentRuleAsNets"

test("presentRuleAsNets", async () => {
  const text = `

type Nat -- @Type end

node zero
  ------
  Nat :value!
end

node add1
  Nat :prev
  ----------
  Nat :value!
end

node add
  Nat :target!
  Nat :addend
  --------
  Nat :return
end

rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end

  `

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentRuleAsNets")
  const mod = await loader.load(url, { text })
  const [initial, final] = presentRuleAsNets(mod, "add1 add")

  expect(formatNet(initial)).toMatchInlineSnapshot(`
    "(add1₂)-prev covering-(@inputPortCap₃)
    (add1₂)-value!target-(add₃)
    (add₃)-addend covering-(@inputPortCap₄)
    (add₃)-return covering-(@ouputPortCap₂)"
  `)

  expect(formatNet(final)).toMatchInlineSnapshot(`
    "(@inputPortCap₃)-covering target-(add₄)
    (@inputPortCap₄)-covering addend-(add₄)
    (@ouputPortCap₂)-covering value-(add1₃)
    (add₄)-return prev-(add1₃)"
  `)
})
