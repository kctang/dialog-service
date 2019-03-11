export const assert = (condition: boolean, message?: string) => {
  if (!condition) {
    if (message) {
      throw new Error(`Assertion error: ${message}`)
    } else {
      throw new Error('Assertion error: Unexpected condition')
    }
  }
}
