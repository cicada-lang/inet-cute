import { createChecking } from "../checking/createChecking"
import { collectWords } from "../compose/collectWords"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { Value } from "../value"
import { formatValue } from "../value/formatValue"
import { Word } from "../word"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed"

export function checkType(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
): {
  inputValues: Array<Value>
} {
  const checking = createChecking()
  const env = createEnv(mod)

  const inputValues = collectWords(mod, env, input, { checking })

  checkAllLocalsAreUsed(env.locals)

  for (const inputValue of inputValues) {
    if (inputValue["@kind"] !== "Type") {
      throw new Error(
        [
          `[checkType] I expect the claimed input of a type definition to be Type.`,
          ``,
          `  input values: [${inputValues
            .map((value) => formatValue(env, value))
            .join(", ")}]`,
        ].join("\n"),
      )
    }
  }

  const outputValues = collectWords(mod, env, output, { checking })

  checkAllLocalsAreUsed(env.locals)

  if (outputValues.length !== 1) {
    throw new Error(
      [
        `[checkType] I expect a type definition to have one and only one claimed output.`,
        ``,
        `  output length: ${outputValues.length}`,
        `  output values: [${outputValues
          .map((value) => formatValue(env, value))
          .join(", ")}]`,
      ].join("\n"),
    )
  }

  const outputValue = outputValues[0]
  if (outputValue["@kind"] !== "Type") {
    throw new Error(
      [
        `[checkType] I expect the claimed output of a type definition to be Type.`,
        ``,
        `  output value: ${formatValue(env, outputValue)}`,
      ].join("\n"),
    )
  }

  return {
    inputValues,
  }
}
