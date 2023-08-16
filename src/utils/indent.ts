export function indent(text: string, indentation: string = "  "): string {
  return text
    .split("\n")
    .map((line) => indentation + line)
    .join("\n")
}
