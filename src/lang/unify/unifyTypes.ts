import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Value } from "../value"
import { formatValue } from "../value/formatValue"
import { deepWalkType } from "./deepWalkType"
import { occurInType } from "./occurInType"
import { walkType } from "./walkType"

export function unifyTypes(
  substitution: Map<string, Value>,
  left: Value,
  right: Value,
): void {
  try {
    left = walkType(substitution, left)
    right = walkType(substitution, right)

    if (
      left["@kind"] === "TypeVar" &&
      right["@kind"] === "TypeVar" &&
      left.name === right.name
    ) {
      return
    }

    if (left["@kind"] === "TypeVar") {
      if (occurInType(substitution, left.name, right)) {
        throw new Error(
          [
            `[unifyTypes] I find the left name occurs in the right type.`,
            ``,
            `  left name: ${left.name}`,
            `  right type: ${formatValue(deepWalkType(substitution, right))}`,
          ].join("\n"),
        )
      }

      substitution.set(left.name, right)
      return
    }

    if (right["@kind"] === "TypeVar") {
      if (occurInType(substitution, right.name, left)) {
        throw new Error(
          [
            `[unifyTypes] I find the right name occurs in the left type.`,
            ``,
            `  right name: ${right.name}`,
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
