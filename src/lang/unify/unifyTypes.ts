import { appendReport } from "../errors/appendReport.js"
import { createReport } from "../errors/createReport.js"
import { formatValue } from "../value/formatValue.js"
import { type Value } from "../value/index.js"
import { deepWalkType } from "./deepWalkType.js"
import { occurInType } from "./occurInType.js"
import { walkType } from "./walkType.js"

export function unifyTypes(
  substitution: Map<string, Value>,
  left: Value,
  right: Value,
): void {
  try {
    left = walkType(substitution, left)
    right = walkType(substitution, right)

    if (
      left["@kind"] === "Symbol" &&
      right["@kind"] === "Symbol" &&
      left.name === right.name
    ) {
      return
    }

    if (left["@kind"] === "Symbol") {
      if (occurInType(substitution, left.name, right)) {
        throw new Error(
          [
            `[unifyTypes] I find the left type variable occurs in the right type.`,
            ``,
            `  left type variable: '${left.name}`,
            `  right type: ${formatValue(deepWalkType(substitution, right))}`,
          ].join("\n"),
        )
      }

      substitution.set(left.name, right)
      return
    }

    if (right["@kind"] === "Symbol") {
      if (occurInType(substitution, right.name, left)) {
        throw new Error(
          [
            `[unifyTypes] I find the right type variable occurs in the left type.`,
            ``,
            `  right type variable: '${right.name}`,
            `  left type: ${formatValue(deepWalkType(substitution, left))}`,
          ].join("\n"),
        )
      }

      substitution.set(right.name, left)
      return
    }

    if (
      left["@kind"] === "TypeTerm" &&
      right["@kind"] === "TypeTerm" &&
      left.name === right.name
    ) {
      for (const [index, leftArg] of left.args.entries()) {
        const rightArg = right.args[index]
        unifyTypes(substitution, leftArg, rightArg)
      }

      return
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[unifyTypes] I fail to unify types.`,
        ``,
        `  left: ${formatValue(deepWalkType(substitution, left))}`,
        `  right: ${formatValue(deepWalkType(substitution, right))}`,
      ].join("\n"),
    })
  }

  throw createReport({
    message: [
      `[unifyTypes] I fail to unify types.`,
      ``,
      `  left: ${formatValue(deepWalkType(substitution, left))}`,
      `  right: ${formatValue(deepWalkType(substitution, right))}`,
    ].join("\n"),
  })
}
