/**
 * Minipage :: Pages.js
 *
 * An attempt at a smallest possible SPA framework.
 */
export default class Pages {
  constructor(root) {
    this._pages = {}
    this._currentPage = null
    this._configuredListeners = []
    this.root = root
  }

  add(name, page) {
    this._pages[name] = page
  }

  _baseListener(pages, name) {
    return function(e) {
      (pages._pageEvents[name] || []).filter(h => e.target.matches(h.selector)).forEach(h => h.handler(e))
    }
  }

  show(name, data) {
    if (this._currentPage && typeof this._currentPage.leave === 'function') {
      this._currentPage.leave()
    }
    this._currentPage = this._pages[name]
    this._currentPage.render(this.root, data)
    this._pageEvents = {}
    this._currentPage.bindEvents((event, selector, handler) => {
      const evt = this._pageEvents[event]
      this._pageEvents[event] = (evt || []).concat({selector, handler})
      if (this._configuredListeners.indexOf(event) === -1) {
        this.root.addEventListener(event, this._baseListener(this, event))
        this._configuredListeners.push(event)
      }
    })
  }
}
