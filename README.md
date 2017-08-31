# Netlify Identity

A component used to authenticate with Netlify's GoTrue API.

## Usage

Netlify Identity has two APIs:

### UMD API

A UMD build of Netlify Identity is provided and only requires adding HTML markup to your website.

```html
<!DOCTYPE html>
<html>
<head>
  <title>A static website</title>
  <!-- Load the script and the stylesheet -->
  <!-- TODO: Update with CDN urls -->
  <script defer type="text/javascript" src="netlify-identity-umd.js"></script>
  <link rel="stylesheet" type="text/css" href="netlify-identity.css">
  <!-- recommended viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
</head>
<body>
  <!-- Create a container for the modal to live in -->
  <!-- data-netlify-identity-url is optional and will default to the active domain-->
  <div data-netlify-identity-modal data-netlify-identity-url="https://your-website.com/.netlify/identity" ></div>
</body>
</html>
```

The UMD version of Netlify Identity will automatically attach itself to the window object as `window.netlifyIdentity`.

### Module API

Netlify Identity also has a module api:

```
yarn add netlify-identity
```

Import or require as usual:

```js
import NetlifyIdentity from "netlify-identity"
// or
const NetlifyIdentity = require("netlify-identity");

const identity = new NetlifyIdentity()

// Select a div on your page that won't change or be overwritten to act as a container
const container = document.querySelector("#external");

// Insert the modal component into the container div
container.appendChild(identity.create());

loginModal.goTrue // an internal goTrue-js instance reference with full API access

loginModal.open() // open the modal

loginModal.on('signup', response => console.log(response)) // listen for important events to read from the goTrue state
loginModal.on('login', login => console.log(user))
loginModal.on('logout', () => console.log("Logged out"))
loginModal.on('error', err => console.error("Logged out")) // Error state will be displayed in modal as well

loginModal.close() // Close the modal
```

The module API does not attach itself to the window object automatically.

## API

### `identity = new NetlifyIdentity([opts], [goTrueOpts])`
Create a new Netlify Identity instance. `goTrueOpts` are passed to an internal [gotrue-js][gt] reference.

`opts` include:

```js
{
  open: true // Open modal on mount
}
```

### `identity.create()`
Return a DOM node that you need to insert into your DOM using something like `DOMnode.appendChild()`.  Only insert this into the page once, and do it in a node where it won't be removed.

### `loginModal.open()`
Opens the Netlify Identity modal.  

### `loginModal.close()`
Closes the Netlify Identity modal.

### `loginModal.goTrue`
Internal reference to the [gotrue-js][gt] instance providing full API access.  This is mainly for external referencing of gotrue state.

### `loginModal.on(event, [data])`

loginModal is an event emitter.  You can listen for the following events:

- `signup`: After a user signs up.  Receives the `response` object.
- `login`: After a user logs in.  Receives the `user` object.
- `logout`: After a user logs out.
- `error`: When any error occurs.  Receives and `error` object.  Error state is also reflected in the modal UI.

[gt]: https://github.com/netlify/gotrue-js
