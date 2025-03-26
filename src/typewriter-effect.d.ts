declare module 'typewriter-effect/dist/core' {
  export default class Typewriter {
    constructor(element: HTMLElement, options?: object)
    typeString(string: string): Typewriter
    start(): void
  }
}
