/**
 * Builds assets/metadata.json from the synced SVG dirs:
 * every icon slug, its display name, and which styles it exists in.
 * Packages and the docs gallery are generated from this file.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const ASSETS = path.join(ROOT, 'assets');
const STYLES = [
  'architecture-group',
  'architecture-service',
  'category',
  'resource',
  'resource-dark',
] as const;

const names: Record<string, string> = JSON.parse(
  fs.readFileSync(path.join(ASSETS, 'names.json'), 'utf8'),
);

const styleMap = new Map<string, string[]>();
for (const style of STYLES) {
  for (const file of fs.readdirSync(path.join(ASSETS, style))) {
    if (!file.endsWith('.svg')) continue;
    const slug = file.slice(0, -4);
    styleMap.set(slug, [...(styleMap.get(slug) ?? []), style]);
  }
}

const titleCase = (slug: string): string =>
  slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');

const icons = [...styleMap.keys()].sort().map((slug) => ({
  slug,
  name: names[slug] ?? titleCase(slug),
  styles: styleMap.get(slug),
}));

fs.writeFileSync(
  path.join(ASSETS, 'metadata.json'),
  `${JSON.stringify({count: icons.length, styles: STYLES, icons}, null, 2)}\n`,
);
console.log(`assets/metadata.json: ${icons.length} icons`);
