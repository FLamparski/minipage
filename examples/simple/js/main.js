import Pages from 'Pages'

const pages = new Pages(document.body)

pages.add('welcome', {
  bindEvents(on) {
    on('click', 'h1', () => alert('Hi!'))
  },
  render(root) {
    root.innerHTML = '<h1>Hello World</h1>'
  }
})

pages.show('welcome')
