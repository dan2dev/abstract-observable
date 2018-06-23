export namespace Global {
  let notifying: boolean = false;
  export function isNotifying(): boolean {
    return notifying;
  }
  export function startNotifying(): void {
    notifying = true;
  }
  export function doneNotifying(): void {
    notifying = false;
  }
}
