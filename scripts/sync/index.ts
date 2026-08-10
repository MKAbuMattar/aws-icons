/**
 * Syncs icons from the official AWS Architecture Icons package into assets/.
 *
 * The zip URL is dated and content-hashed, so it is discovered from the AWS
 * icons page on every run (override with SYNC_ZIP_URL). Keeps the 48px light
 * set across the four categories, optimizes every SVG with svgo, and rebuilds
 * assets/{architecture-group,architecture-service,category,resource}/.
 *
 * svgo ID prefixes are derived from the slug (deterministic), so re-running
 * sync only diffs icons that actually changed upstream.
 */
import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {type Config, optimize} from 'svgo';

const ROOT = path.resolve(import.meta.dirname, '../..');
const TMP = path.join(ROOT, '.tmp/upstream');
const ASSETS = path.join(ROOT, 'assets');

const ICONS_PAGE = 'https://aws.amazon.com/architecture/icons/';
const ZIP_RE =
  /https:\/\/d1\.awsstatic\.com\/[^"'\s]*Icon-package[^"'\s]*\.zip/i;

const CATEGORY_DIRS: Record<string, string> = {
  'Architecture-Group': 'architecture-group',
  'Architecture-Service': 'architecture-service',
  'Category-Icons': 'category',
  'Resource-Icons': 'resource',
};

const discoverZipUrl = async (): Promise<string> => {
  if (process.env.SYNC_ZIP_URL) return process.env.SYNC_ZIP_URL;
  const html = await (await fetch(ICONS_PAGE)).text();
  const match = ZIP_RE.exec(html);
  if (!match)
    throw new Error(`No Icon-package zip link found on ${ICONS_PAGE}`);
  return match[0];
};

/** Display name from the upstream filename, keeping AWS casing (Amazon EC2). */
const displayName = (filename: string): string =>
  filename
    .replace(/\.svg$/i, '')
    .replace(/^(Arch-Category_|Arch_|Res_|Arch-Group_)/i, '')
    .replace(/_(16|32|48|64)(_(Light|Dark))?$/i, '')
    .replace(/_(Light|Dark)$/i, '')
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (filename: string): string =>
  filename
    .replace(/\.svg$/i, '')
    .replace(/^(Arch-Category_|Arch_|Res_|Arch-Group_)/i, '')
    .replace(/_(16|32|48|64)(_(Light|Dark))?$/i, '')
    .replace(/_(Light|Dark)$/i, '')
    // keep known acronyms as one word before camelCase splitting
    .replaceAll('IoT', 'Iot')
    .replaceAll('B2B', 'B2b')
    .replaceAll('3D', '3d')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll('_', '-')
    .replaceAll(' ', '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

const svgoConfig = (slug: string): Config => ({
  plugins: [
    'preset-default',
    'removeTitle',
    'convertStyleToAttrs',
    'cleanupIds',
    {
      name: 'prefixIds',
      params: {delim: '', prefix: `ai-${slug}-`},
    },
    'removeDimensions',
  ],
});

const categoryOf = (relPath: string): string | undefined => {
  for (const [marker, dir] of Object.entries(CATEGORY_DIRS)) {
    if (relPath.includes(marker)) return dir;
  }
  return undefined;
};

const keepFile = (relPath: string): boolean => {
  const base = path.basename(relPath);
  if (!base.endsWith('.svg')) return false;
  if (/dark/i.test(relPath)) return false;
  // architecture-group icons only ship at 32px; everything else keeps the 48px set
  if (relPath.includes('Architecture-Group')) return /_32\.svg$/.test(base);
  return /48/.test(relPath) && !/_(16|32|64)\b/.test(base);
};

const main = async (): Promise<void> => {
  const zipUrl = await discoverZipUrl();
  console.log(`Syncing from ${zipUrl}`);

  fs.rmSync(TMP, {recursive: true, force: true});
  fs.mkdirSync(TMP, {recursive: true});
  const zipPath = path.join(TMP, 'icons.zip');
  const res = await fetch(zipUrl);
  if (!res.ok) throw new Error(`download failed: ${res.status}`);
  fs.writeFileSync(zipPath, Buffer.from(await res.arrayBuffer()));
  execSync(`unzip -q ${zipPath} -d ${TMP}/extracted`, {stdio: 'inherit'});
  fs.rmSync(path.join(TMP, 'extracted/__MACOSX'), {
    recursive: true,
    force: true,
  });

  for (const dir of Object.values(CATEGORY_DIRS)) {
    fs.rmSync(path.join(ASSETS, dir), {recursive: true, force: true});
    fs.mkdirSync(path.join(ASSETS, dir), {recursive: true});
  }

  const files = fs
    .readdirSync(path.join(TMP, 'extracted'), {recursive: true})
    .map(String)
    .filter(keepFile);

  let written = 0;
  const seen = new Set<string>();
  const names: Record<string, string> = {};
  for (const rel of files) {
    const cat = categoryOf(rel);
    if (!cat) continue;
    const slug = slugify(path.basename(rel));
    if (!slug) continue;
    const key = `${cat}/${slug}`;
    if (seen.has(key)) {
      console.warn(`duplicate slug skipped: ${key} <- ${rel}`);
      continue;
    }
    seen.add(key);
    names[slug] ??= displayName(path.basename(rel));

    const raw = fs.readFileSync(path.join(TMP, 'extracted', rel), 'utf8');
    const {data} = optimize(raw, svgoConfig(slug));
    fs.writeFileSync(path.join(ASSETS, cat, `${slug}.svg`), data);
    written++;
  }
  fs.writeFileSync(
    path.join(ASSETS, 'names.json'),
    `${JSON.stringify(names, null, 2)}\n`,
  );
  console.log(`Wrote ${written} optimized SVGs to assets/`);
  if (written < 800) {
    throw new Error(
      `suspiciously few icons (${written}) — upstream layout may have changed`,
    );
  }
  fs.rmSync(TMP, {recursive: true, force: true});
};

main();
