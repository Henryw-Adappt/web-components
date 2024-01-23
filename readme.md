# Web Components

A presentation on native Web Components, by Henry Winchester.

### What are web components?

"Web Components" describe technologies for creating native HTML/JS UI components for the browser.

First emerged out of a 2013 draft specification for custom elements created by Google, in conjunction with the draft shadow DOM specification.

Chrome implemented the first specifications early on, with wider adoption coming in 2018 and beyond.

Web component technologies are relatively new, but have built on the ideas of frameworks like Angular and React, and are becoming well established.

> See [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components) for technical information, and [Web Components 101: History](https://coderpad.io/blog/development/web-components-101-history/) for an overview of their history.

### What are the core technologies?

Comprised of three core technologies:

- Custom elements
- Shadow DOM
- Templates

#### Custom Elements

The custom elements API allows developers to use JavaScript classes to extend existing HTML elements.

This can include pre-existing elements, like `<p> ... </p>` tags, or `HTMLElement` to create entirely new elements.

Custom elements must be registered with the custom elements registry (`customElements` in the `window`), and given a tag name.

Custom elements have four lifecycle events that can be implemented:

- `connectedCallback()` - like Angular's OnInit method.
- `disconnectedCallback()` - like Angular's OnDestroy method.
- `attributeChangedCallback()` - like Angular's OnChanges method.
- `adoptedCallback()` - if the element moves to a new document.

The first three are the important ones.

Once defined using `customElements.define('foo-bar', FooBarElement)`, the custom element can be used - natively - anywhere.

> Live Coding Example:
> Create a new custom element, `app-card`.

#### Shadow DOM

Shadow DOM describes an encapsulated DOM tree that can be added to an element via JS.

It renders separately from the main document.

Requires own style-sheets - global style-sheets **do not** apply to it.

Both classes _and_ IDs are encapsulated.

Anything inside the shadow DOM tree is hidden from JS on a page. This means it is protected from any JS that might (accidentally) modify it. E.g., if it contains a class 'my-canvas', and some JS script always attaches P5 instances to 'my-canvas'.

Shadow DOM has `open` and `closed` modes. Open lets you access the shadow DOM via the hosts shadowRoot property. Closed does not. Guidance from the official docs recommends using `open` for most scenarios.

> Live Coding Example:
> Attach shadow DOM to `app-card`.

You can style shadow DOM trees using the StyleSheet API.

You can style the host with the `:host` pseudo-class. The host is the element with the shadow DOM attached.

CSS variables _aren't_ affected by encapsulation.

> Live Coding Example:
> Style `app-card`.

#### Templates

The final technology is templates.

Templates are included in a document but aren't rendered.

Custom elements can get templates and clone them, then attach the templates to the custom element.

> Live coding example:
> Create template for `app-card`.

Templates can also use `<slot> ... </slot>` tags. Content within a custom element is projected into the slot.

Slots can be named: `<slot name="foo"> ... </slot>`. Content with the `[slot]="foo"` attribute is projected into that slot. By default, unnamed content is projected into the unnamed slot.

Slots can be styled with the `::slotted(selector)` pseudo-class.

> Live coding example:
> Add slots to the `app-card` template.

### What about attributes, state, and events?

Custom elements can check attributes for changes by adding the static `observedAttributes` property to their class.

Observed attributes are watched for changes. When they change, the `attributeChangedCallback()` is called, allowing the custom element to respond. This method is also called when attributes are first set.

Element state can be managed internally, in the class. State can even be exposed to CSS with custom pseudo-classes.

Events can be handled with standard JS event listeners, and the CustomEvent API.

> Live coding example:
> Listen to the card click, to close.

### Why use custom elements?

Custom elements are native. They can be used anywhere (given the browser supports them). That means React, Angular, and Blazor applications.

They provide the added bonus in Blazor of encapsulating JS interop.

### What next?

One of the earliest web components frameworks was , which eventually became LitElement, and now just Lit.

Lit has similar state and templating to Angular, but is far more lightweight (~5kB). It lacks many of Angular's features however.

There is also Stencil, which works as a 'Web Components Compiler'. The output are web components that can dropped into any page.

Angular and Blazor have (early) support for converting components to web components.
