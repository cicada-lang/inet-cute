export function stringToSubscript(s: string): string {
  return [...s].map((c) => numberSubscripts[c] || c).join("")
}

const numberSubscripts: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
}
