export abstract class Type {
  abstract format(): string

  isPrincipal(): boolean {
    return false
  }
}
