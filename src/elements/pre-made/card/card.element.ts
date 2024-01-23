import template from './card.element.html?raw';
import css from './card.element.css?raw';

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(css);

export class PreMadeCardElement extends HTMLElement {
  static template = template;

  static observedAttributes = ['collapsible'];

  public collapsible = true;

  public get card() {
    return this.shadowRoot?.getElementById('card');
  }

  public get collapsed() {
    return this.card?.classList.contains('collapsed');
  }

  public set collapsed(flag) {
    if (flag) this.card?.classList.add('collapsed');
    else this.card?.classList.remove('collapsed');
  }

  constructor() {
    super();
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  public connectedCallback() {
    console.log('Connected app-pre-made-card:', this);

    /* Attach shadow root */
    const shadowRoot = this.attachShadow({ mode: 'open' });

    /* Append element */
    // const div = document.createElement('div');
    // div.style.minHeight = '400px';
    // div.style.width = '400px';
    // div.style.background = 'white';
    // shadowRoot.append(div);

    /* Adopt stylesheet */
    shadowRoot.adoptedStyleSheets.push(styleSheet);

    /** Template */
    const template = document.getElementById(
      'app-pre-made-card-template'
    ) as HTMLTemplateElement;
    if (!template) throw new Error('No template found for app-pre-made-card.');
    const templateContent = template.content;
    shadowRoot.append(templateContent.cloneNode(true));

    const headerButton = shadowRoot.getElementById(
      'header'
    ) as HTMLButtonElement;

    /* Event listeners */
    headerButton.addEventListener('click', this.onHeaderClick);
  }

  public disconnectedCallback() {
    const headerButton = this.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement | null;
    if (!headerButton) return;
    headerButton.removeEventListener('click', this.onHeaderClick);
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (name === 'collapsible') {
      this.collapsible = newValue === 'true';
      this.collapsed = this.collapsed && this.collapsible;
    }
  }

  public onHeaderClick() {
    if (!this.collapsible && !this.collapsed) return;
    this.collapsed = !this.collapsed;
  }
}

customElements.define('app-pre-made-card', PreMadeCardElement);
