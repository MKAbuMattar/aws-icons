import metadataJson from '../metadata.json' with {type: 'json'};
import type {IconCategory, IconSlug} from './icon.generated';

export type {IconCategory, IconSlug} from './icon.generated';

export type IconEntry = {
  slug: IconSlug;
  name: string;
  styles: IconCategory[];
};

export type IconMetadata = {
  count: number;
  styles: IconCategory[];
  icons: IconEntry[];
};

export const metadata = metadataJson as IconMetadata;

const bySlug = new Map(metadata.icons.map((e) => [e.slug, e]));

/** Metadata entry for one icon, or undefined if the slug is unknown. */
export const getIcon = (slug: IconSlug): IconEntry | undefined =>
  bySlug.get(slug);

/**
 * Package path of an icon SVG, resolvable by bundlers and
 * `import.meta.resolve` / `require.resolve`.
 */
export const getIconPath = (slug: IconSlug, style: IconCategory): string =>
  `@aws-icons/svg/icons/${style}/${slug}.svg`;
