import fs from 'node:fs/promises';
import type {IncomingMessage, ServerResponse} from 'node:http';
import {createRequire} from 'node:module';
import type {IconCategory, IconSlug} from '@aws-icons/svg';

const resolve = createRequire(import.meta.url).resolve;

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/**
 * SVG fragment for an icon, ready to swap into the page.
 * Runs on the server — htmx fetches the result.
 */
export const iconHtml = async (
  name: IconSlug,
  style: IconCategory = 'architecture-service',
  label?: string,
): Promise<string> => {
  const file = resolve(`@aws-icons/svg/icons/${style}/${name}.svg`);
  const svg = await fs.readFile(file, 'utf8');
  const aria = label
    ? ` role="img" aria-label="${esc(label)}"`
    : ' role="img" aria-hidden="true"';
  return svg.replace('<svg', `<svg${aria}`);
};

const STYLES = new Set([
  'architecture-group',
  'architecture-service',
  'category',
  'resource',
]);
const SLUG = /^[a-z0-9-]+$/;

/**
 * Request handler serving icon fragments for htmx. Works with node:http,
 * Express, and anything with the same (req, res, next?) shape.
 *
 * ```js
 * app.use(awsIconHandler());   // GET /aws-icons/:style/:slug?label=...
 * ```
 * ```html
 * <span hx-get="/aws-icons/flat/rocket" hx-trigger="load"></span>
 * ```
 */
export const awsIconHandler = ({prefix = '/aws-icons'} = {}) => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next?: () => void,
  ): Promise<void> => {
    const url = new URL(req.url ?? '/', 'http://local');
    if (!url.pathname.startsWith(`${prefix}/`)) {
      if (next) return next();
      res.statusCode = 404;
      res.end();
      return;
    }
    const [style, slug] = url.pathname.slice(prefix.length + 1).split('/');
    if (!STYLES.has(style) || !slug || !SLUG.test(slug)) {
      res.statusCode = 404;
      res.end('unknown icon');
      return;
    }
    try {
      const html = await iconHtml(
        slug as IconSlug,
        style as IconCategory,
        url.searchParams.get('label') ?? undefined,
      );
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.end(html);
    } catch {
      res.statusCode = 404;
      res.end('unknown icon');
    }
  };
};
