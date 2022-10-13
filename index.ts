class AsyncSharedLock {
  private wait: Promise<any> | null;
  private resolver: any;

  acquire() {
    if (this.wait) {
      return this.wait;
    }

    let resolver: unknown = null;
    this.wait = new Promise((r) => (resolver = r));
    this.resolver = resolver;

    return Promise.resolve();
  }

  release() {
    const resolver = this.resolver;
    resolver && resolver();
    this.resolver = null;
    this.wait = null;
  }
}

export default AsyncSharedLock;
