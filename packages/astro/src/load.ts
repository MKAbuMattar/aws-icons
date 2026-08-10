import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import type {IconSlug, IconCategory} from '@aws-icons/svg';

const resolve = createRequire(import.meta.url).resolve;

/**
 * Reads an icon SVG from @aws-icons/svg and injects extra attributes
 * into the root <svg> tag. Runs at build time — the page ships inline SVG,
 * zero client JS.
 */
export const loadIconSvg = async (
  name: IconSlug,
  style: IconCategory = 'architecture-service',
  attrs: Record<string, unknown> = {},
): Promise<string> => {
  const file = resolve(`@aws-icons/svg/icons/${style}/${name}.svg`);
  const svg = await fs.readFile(file, 'utf8');
  const extra = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${String(v).replaceAll('"', '&quot;')}"`)
    .join('');
  return extra ? svg.replace('<svg', `<svg${extra}`) : svg;
};
