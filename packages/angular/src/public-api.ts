import {
  Directive,
  ElementRef,
  Input,
  inject,
  type OnChanges,
} from '@angular/core';

export type AwsIconData = {
  slug: string;
  style:
    | 'architecture-group'
    | 'architecture-service'
    | 'category'
    | 'resource';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, AwsIconData>();

/** Makes icons usable by name in the directive. */
export const register = (...icons: AwsIconData[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/** Raw SVG markup for a registered icon; empty string when unknown. */
export const iconHtml = (
  name: string,
  style: AwsIconData['style'] = 'architecture-service',
  label?: string,
): string => {
  const icon = registry.get(`${style}/${name}`);
  if (!icon) return '';
  const attrs = Object.entries(icon.attrs)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join('');
  const aria = label ? ` aria-label="${esc(label)}"` : ' aria-hidden="true"';
  return `<svg${attrs} role="img"${aria}>${icon.html}</svg>`;
};

/**
 * Standalone directive rendering a registered icon into the host element.
 *
 * ```html
 * <span awsIcon="rocket"></span>
 * <span awsIcon="rocket" iconStyle="modern" iconLabel="Rocket"></span>
 * ```
 */
@Directive({selector: '[awsIcon]', standalone: true})
export class AwsIconDirective implements OnChanges {
  @Input({required: true}) awsIcon!: string;
  @Input() iconStyle: AwsIconData['style'] = 'architecture-service';
  @Input() iconLabel?: string;

  readonly #el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnChanges(): void {
    this.#el.nativeElement.innerHTML = iconHtml(
      this.awsIcon,
      this.iconStyle,
      this.iconLabel,
    );
  }
}
