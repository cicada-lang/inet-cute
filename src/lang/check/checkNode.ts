import { createChecking } from "../checking/createChecking.ts"
import { collectWords } from "../compose/collectWords.ts"
import { createEnv } from "../env/createEnv.ts"
import { type Mod } from "../mod/index.ts"
import { type PortExp } from "../port/PortExp.ts"
import { formatValue } from "../value/formatValue.ts"
import { type Value } from "../value/index.ts"
import { type Word } from "../word/index.ts"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.ts"

export function checkNode(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
): {
  inputPortExps: Array<PortExp>
  outputPortExps: Array<PortExp>
} {
  const checking = createChecking()
  const env = createEnv(mod)

  const inputValues = collectWords(mod, env, input, { checking })
  const outputValues = collectWords(mod, env, output, { checking })

  checkAllLocalsAreUsed(env.locals)

  const inputPortExps = inputValues.map(portExpFromValue)
  const outputPortExps = outputValues.map(portExpFromValue)

  const principalPorts = [...inputPortExps, ...outputPortExps].filter(
    (port) => port.isPrincipal,
  )

  if (principalPorts.length !== 1) {
    throw new Error(
      [
        `[checkNode] I expect a node to have one and only one principal port.`,
        ``,
        `  declared principal ports: [${principalPorts
          .map((port) => port.name)
          .join(", ")}]`,
      ].join("\n"),
    )
  }

  return {
    inputPortExps,
    outputPortExps,
  }
}

function portExpFromValue(value: Value): PortExp {
  if (value["@kind"] !== "Labeled") {
    throw new Error(
      [
        `[portExpFromValue] I expect the value to be a Labeled Value`,
        ``,
        `  value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  return {
    "@type": "PortExp",
    name: value.label,
    t: value.value,
    isPrincipal: Boolean(value.isImportant),
  }
}
