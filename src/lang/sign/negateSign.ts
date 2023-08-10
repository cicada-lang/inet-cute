import { Sign } from "./Sign"

export function negateSign(sign: Sign): Sign {
  switch (sign) {
    case 1:
      return -1

    case -1:
      return 1
  }
}
