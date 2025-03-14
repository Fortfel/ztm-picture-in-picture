import '@/style/tailwind.css'
import { throwIfNull } from '@/_utility'

/**
 * Represents references to DOM elements used in the application.
 */
type DomReferences = Readonly<{
  /** Reference to the main application container element. */
  app: HTMLElement
  /** Reference to the video element. */
  video: HTMLVideoElement
  /** Reference to the start button element. */
  button: HTMLButtonElement
}>

class App {
  public readonly domRefs: DomReferences

  /**
   * Creates a new instance of the application.
   */
  constructor() {
    this.domRefs = this.initDomRefs()

    this.initialize()
  }

  /**
   * Initializes the DOM references for the application.
   * @throws Error if any of the DOM elements are not found.
   * @returns An object containing references to DOM elements.
   */
  private initDomRefs(): DomReferences {
    const app = throwIfNull(document.querySelector<HTMLElement>('#app'), 'App element not found')
    const video = throwIfNull(document.querySelector<HTMLVideoElement>('#video'), 'Video element not found')
    const button = throwIfNull(document.querySelector<HTMLButtonElement>('#start'), 'Start button element not found')

    return Object.freeze({
      app,
      video,
      button,
    })
  }

  private initialize(): void {
    void this.selectMediaStream()
    this.bindEvents()
  }

  private bindEvents(): void {
    this.domRefs.button.addEventListener('click', () => {
      this.domRefs.button.disabled = true
      this.domRefs.video
        .requestPictureInPicture()
        .then(() => {
          this.domRefs.button.disabled = false
        })
        .catch((reason: unknown) => {
          console.error(reason)
          this.domRefs.button.disabled = false
        })
    })
  }

  /**
   * Selects a media stream and plays it in the video element.
   * @returns A Promise that resolves when the media stream is selected and played.
   */
  private async selectMediaStream(): Promise<void> {
    try {
      this.domRefs.video.srcObject = await navigator.mediaDevices.getDisplayMedia({ video: true })
      this.domRefs.video.onloadedmetadata = async (): Promise<void> => {
        await this.domRefs.video.play()
      }
    } catch (error) {
      console.log('Failed to get media stream', error)
    }
  }
}

new App()
