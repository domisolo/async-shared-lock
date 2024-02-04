type noop = (value?: unknown) => void;

class AsyncLock {
  private wait: Promise<unknown> | null = null;
  private resolver: noop | null = null;
  private timeoutTimer: number = 0;

  constructor() {
    this.wait = new Promise((r: noop) => (this.resolver = r));
  }

  public acquire(ms: number) {
    if (ms > 0 && this.wait !== null) {
      this.timeoutTimer = window.setTimeout(() => this.release(), ms);
    }
    return this.wait;
  }

  public release() {
    this.resolver?.();
    this.resolver = null;
    this.wait = null;
    if (this.timeoutTimer > 0) {
      window.clearTimeout(this.timeoutTimer);
      this.timeoutTimer = 0;
    }
  }
}

export default AsyncLock;
