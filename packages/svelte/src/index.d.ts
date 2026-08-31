import type {Component} from 'svelte';
import type {SVGAttributes} from 'svelte/elements';

export type AwsIconData = {
  attrs: Record<string, string>;
  html: string;
};

export type IconProps = SVGAttributes<SVGSVGElement> & {
  /** Icon data imported from a set entry, e.g. `@aws-icons/svelte/architecture-service` */
  icon: AwsIconData;
  /** Accessible label. Without it the icon is aria-hidden (decorative). */
  title?: string;
};

export declare const Icon: Component<IconProps>;
