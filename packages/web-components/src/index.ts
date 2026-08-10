export type AwsIconData = {
  slug: string;
  style: 'architecture-group' | 'architecture-service' | 'category' | 'resource';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, AwsIconData>();

/** Makes an icon usable by name: `<aws-icon name="rocket" variant="flat">`. */
export const register = (...icons: AwsIconData[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const render = (el: HTMLElement, icon: AwsIconData | undefined): void => {
  if (!icon) {
    el.replaceChildren();
    return;
  }
  const label = el.getAttribute('label');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [k, v] of Object.entries(icon.attrs)) svg.setAttribute(k, v);
  svg.setAttribute('role', 'img');
  if (label) svg.setAttribute('aria-label', label);
  else svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = icon.html;
  el.replaceChildren(svg);
};

/**
 * Defines the `<aws-icon>` custom element (browser only).
 *
 * ```html
 * <aws-icon name="rocket" variant="modern" label="Rocket"></aws-icon>
 * ```
 *
 * Icons resolve from the registry (`register(Rocket)`) or via the `icon`
 * property. `variant` defaults to `flat`; without `label` the svg is
 * aria-hidden.
 */
export const defineAwsIcon = (tag = 'aws-icon'): void => {
  if (typeof HTMLElement === 'undefined') {
    throw new Error('@aws-icons/web-components requires a DOM');
  }
  if (customElements.get(tag)) return;

  class AwsIconElement extends HTMLElement {
    static observedAttributes = ['name', 'variant', 'label'];
    #icon: AwsIconData | undefined;

    get icon(): AwsIconData | undefined {
      return this.#icon;
    }

    set icon(icon: AwsIconData | undefined) {
      this.#icon = icon;
      render(this, this.#resolve());
    }

    #resolve(): AwsIconData | undefined {
      if (this.#icon) return this.#icon;
      const name = this.getAttribute('name');
      const variant = this.getAttribute('variant') ?? 'architecture-service';
      return name ? registry.get(`${variant}/${name}`) : undefined;
    }

    connectedCallback() {
      render(this, this.#resolve());
    }

    attributeChangedCallback() {
      if (this.isConnected) render(this, this.#resolve());
    }
  }

  customElements.define(tag, AwsIconElement);
};
