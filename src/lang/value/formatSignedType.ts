import { Sign, SignedType } from "./Value"
import { formatValue } from "./formatValue"

export function formatSignedType(signedType: SignedType): string {
  const t = formatValue(signedType.t)
  const sign = formatSign(signedType.sign)
  return `${sign}${t}`
}

function formatSign(sign: Sign): string {
  switch (sign) {
    case 1: {
      return `+`
    }

    case 0: {
      return `±`
    }

    case -1: {
      return `-`
    }
  }
}
