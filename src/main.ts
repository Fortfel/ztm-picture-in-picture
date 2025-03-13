import '@/style/tailwind.css'
import { throwIfNull, tw } from '@/_utility'

//TODO[fortf] README

/**
 * Represents references to DOM elements used in the application.
 */
type DomReferences = Readonly<{
  /** Reference to the main application container element. */
  app: HTMLElement
}>

/**
 * Options for configuring the application.
 */
type Options = Readonly<{
  attempts: number
}>

/**
 * Configuration parameters for the application.
 */
type Parameters = Readonly<{
  /** Optional configuration options for the application. */
  options: Partial<Options>
}>

class App {
  //TODO[fortf] use WeakMap for eventlisteners?
  //TODO[fortf] add compose and pipe to utilities / usage with arr.reduce
  public readonly domRefs: DomReferences
  private readonly options: Options
  private readonly defaultOptions = {
    attempts: 5,
  } as const satisfies Options

  /**
   * Creates a new instance of the application.
   * @param options - Optional configuration for the application.
   */
  constructor({ options }: Parameters = { options: {} }) {
    this.options = { ...this.defaultOptions, ...options }
    this.domRefs = this.initDomRefs()

    this.initialize()
    const div = document.createElement('div')
    div.className = 'bg-stripes-fuchsia-500 font-sans'
    div.innerText = 'KEK'
    this.domRefs.app.appendChild(div)
  }

  /**
   * Initializes the DOM references for the application.
   * @throws Error if the app element is not found.
   * @returns An object containing references to DOM elements.
   */
  private initDomRefs(): DomReferences {
    const app = throwIfNull(document.querySelector<HTMLElement>('#app'), 'App element not found')

    return Object.freeze({
      app,
    })
  }

  private initialize(): void {
    this.setupBodyClass()
  }

  /**
   * Sets up the body class.
   */
  private setupBodyClass(): void {
    document.body.classList.add(...tw`min-h-screen bg-slate-900 text-slate-400 antialiased`.split(' '))
  }
}

new App()
