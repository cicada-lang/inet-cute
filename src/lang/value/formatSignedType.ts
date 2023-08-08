import { Sign, SignedType } from "./Value"
import { formatType } from "./formatType"

export function formatSignedType(signedType: SignedType): string {
  const t = formatType(signedType.t)
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
