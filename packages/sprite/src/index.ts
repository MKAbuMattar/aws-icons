export type SpriteSet =
  | 'architecture-group'
  | 'architecture-service'
  | 'category'
  | 'resource'
  | 'resource-dark';

export const sets: readonly SpriteSet[] = [
  'architecture-group',
  'architecture-service',
  'category',
  'resource',
  'resource-dark',
] as const;

/**
 * Fragment URL for one icon in a sprite you serve yourself:
 * `spriteHref('/sprites/flat.svg', 'rocket')` -> `/sprites/flat.svg#rocket`.
 */
export const spriteHref = (spriteUrl: string, slug: string): string =>
  `${spriteUrl}#${slug}`;

/** Package path of a sprite file, resolvable by bundlers. */
export const spritePath = (set: SpriteSet): string =>
  `@aws-icons/sprite/${set}.svg`;
