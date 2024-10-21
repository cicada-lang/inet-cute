import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher/index.js"
import { Loader } from "../../loader/index.js"
import { formatNet } from "../net/formatNet.js"
import { presentNodeAsNet } from "./presentNodeAsNet.js"

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
