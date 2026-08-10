import {LitElement, nothing} from 'lit';
import type {DirectiveResult} from 'lit/directive.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

export type AwsIconData = {
  slug: string;
  style: 'architecture-group' | 'architecture-service' | 'category' | 'resource';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, AwsIconData>();

/** Makes icons usable by name: `<aws-icon name="rocket">`. */
export const register = (...icons: AwsIconData[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/** Raw SVG markup for an icon. */
export const iconSvg = (icon: AwsIconData, label?: string): string => {
  const attrs = Object.entries(icon.attrs)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join('');
  const aria = label ? ` aria-label="${esc(label)}"` : ' aria-hidden="true"';
  return `<svg${attrs} role="img"${aria}>${icon.html}</svg>`;
};

/** For use inside your own `html` templates: `${iconTemplate(Rocket)}`. */
export const iconTemplate = (
  icon: AwsIconData,
  label?: string,
): DirectiveResult => unsafeHTML(iconSvg(icon, label));

/**
 * `<aws-icon>` Lit element. Renders into light DOM so the SVG inherits
 * page styles. Icons resolve from the registry or the `icon` property.
 */
export class AwsIconElement extends LitElement {
  static properties = {
    name: {type: String},
    variant: {type: String},
    label: {type: String},
    icon: {attribute: false},
  };

  declare name?: string;
  declare variant?: AwsIconData['style'];
  declare label?: string;
  declare icon?: AwsIconData;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const icon =
      this.icon ??
      (this.name
        ? registry.get(`${this.variant ?? 'architecture-service'}/${this.name}`)
        : undefined);
    return icon ? iconTemplate(icon, this.label) : nothing;
  }
}

/** Defines the element (browser only). */
export const defineAwsIcon = (tag = 'aws-icon'): void => {
  if (!customElements.get(tag)) customElements.define(tag, AwsIconElement);
};
