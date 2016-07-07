# Minipage

This is a _highly experimental_ microframework for single-page applications.
The goal is to create the smallest possible framework that can help test
an API concept.

## Pages

The Pages class is the only element of the framework.

```js
import Pages from 'Pages'
const pages = new Pages(document.body)
```

This creates an empty collection of Pages that render into the document body.
Now you can add views into the Pages collection.

```js
pages.add('welcome', {
  bindEvents(on) {
    on('click', 'h1', () => alert('Hi!'))
  },
  render(root) {
    root.innerHTML = '<h1>Hello World</h1>'
  }
})
```

This adds a new view to `pages`. The view also binds a single
event listener that fires when the h1 element is clicked.
There is no scoping or anything yet, and the selector must match
`event.target`.

Finally, to show the new page:

```js
pages.show('welcome')
```

If you wish to make a page that has some data context:

```js
pages.add('user:profile', {
  render(root, user) {
    // ...
  }
})

pages.show('user:profile', Users.findOne('user@example.com'))
```

Don't count on `this` in the event listeners, using ES6 arrow functions
is recommended to keep `this` pointing at the page object itself.
