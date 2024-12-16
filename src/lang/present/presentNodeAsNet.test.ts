import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher/index.ts"
import { Loader } from "../../loader/index.ts"
import { formatNet } from "../net/formatNet.ts"
import { presentNodeAsNet } from "./presentNodeAsNet.ts"

test("presentNodeAsNet", async () => {
  const text = `

type Nat -- @Type end

node add
  Nat :target!
  Nat :addend
  --------
  Nat :return
end

  `

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentNodeAsNet")
  const mod = await loader.load(url, { text })
  const net = presentNodeAsNet(mod, "add")

  expect(formatNet(net)).toMatchInlineSnapshot(`
    "(add₀)-target covering-(@inputPortCap₀)
    (add₀)-addend covering-(@inputPortCap₁)
    (add₀)-return covering-(@ouputPortCap₀)"
  `)
})
