import {type IconCategory, metadata} from '@aws-icons/svg';
import {useEffect, useMemo, useRef, useState} from 'react';

const STYLES: IconCategory[] = ['architecture-group', 'architecture-service', 'category', 'resource'];
const BATCH = 240; // cells rendered per scroll batch — keeps the DOM light

const componentName = (slug: string): string => {
  const pascal = slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join('');
  return /^\d/.test(pascal) ? `Icon${pascal}` : pascal;
};

const snippets = (
  slug: string,
  style: IconCategory,
): {id: string; label: string; code: string}[] => {
  const name = componentName(slug);
  return [
    {
      id: 'svg',
      label: 'SVG',
      code: `import svg from '@aws-icons/svg/icons/${style}/${slug}.svg';\n\n// or resolve the path at runtime:\nimport {getIconPath} from '@aws-icons/svg';\ngetIconPath('${slug}', '${style}');`,
    },
    {
      id: 'react',
      label: 'React',
      code: `import {${name}} from '@aws-icons/react/${style}';\n\n<${name} width={32} />`,
    },
    {
      id: 'preact',
      label: 'Preact',
      code: `import {${name}} from '@aws-icons/preact/${style}';\n\n<${name} width={32} />`,
    },
    {
      id: 'vue',
      label: 'Vue',
      code: `<script setup>\nimport {${name}} from '@aws-icons/vue/${style}';\n</script>\n\n<template>\n  <${name} width="32" />\n</template>`,
    },
    {
      id: 'solid',
      label: 'Solid',
      code: `import {${name}} from '@aws-icons/solid/${style}';\n\n<${name} width={32} />`,
    },
    {
      id: 'svelte',
      label: 'Svelte',
      code: `<script>\nimport {Icon} from '@aws-icons/svelte';\nimport {${name}} from '@aws-icons/svelte/${style}';\n</script>\n\n<Icon icon={${name}} width="32" />`,
    },
    {
      id: 'astro',
      label: 'Astro',
      code: `---\nimport {Icon} from '@aws-icons/astro';\n---\n\n<Icon name="${slug}" variant="${style}" width="32" />`,
    },
    {
      id: 'angular',
      label: 'Angular',
      code: `import {AwsIconDirective, register} from '@aws-icons/angular';\nimport {${name}} from '@aws-icons/angular/${style}';\n\nregister(${name});\n\n// template (import AwsIconDirective in the component):\n<span awsIcon="${slug}" iconStyle="${style}"></span>`,
    },
    {
      id: 'lit',
      label: 'Lit',
      code: `import {defineAwsIcon, register} from '@aws-icons/lit';\nimport {${name}} from '@aws-icons/lit/${style}';\n\nregister(${name});\ndefineAwsIcon();\n\n<aws-icon name="${slug}" variant="${style}"></aws-icon>`,
    },
    {
      id: 'wc',
      label: 'Web Components',
      code: `import {defineAwsIcon, register} from '@aws-icons/web-components';\nimport {${name}} from '@aws-icons/web-components/${style}';\n\nregister(${name});\ndefineAwsIcon();\n\n<aws-icon name="${slug}" variant="${style}"></aws-icon>`,
    },
    {
      id: 'alpine',
      label: 'Alpine.js',
      code: `import Alpine from 'alpinejs';\nimport awsIcon, {register} from '@aws-icons/alpine';\nimport {${name}} from '@aws-icons/alpine/${style}';\n\nregister(${name});\nAlpine.plugin(awsIcon);\n\n<span x-aws-icon="{name: '${slug}', style: '${style}'}"></span>`,
    },
    {
      id: 'htmx',
      label: 'htmx',
      code: `// server\nimport {awsIconHandler} from '@aws-icons/htmx';\napp.use(awsIconHandler());\n\n<!-- page -->\n<span hx-get="/aws-icons/${style}/${slug}" hx-trigger="load"></span>`,
    },
  ];
};

const svgCache = new Map<string, Promise<string>>();
const fetchSvg = (url: string): Promise<string> => {
  let hit = svgCache.get(url);
  if (!hit) {
    hit = fetch(url).then((r) => (r.ok ? r.text() : ''));
    svgCache.set(url, hit);
  }
  return hit;
};

/** Inline SVG, fetched when the cell scrolls into view. */
function InlineIcon({url, size = 34}: {url: string; size?: number}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let alive = true;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          fetchSvg(url).then((text) => alive && setSvg(text));
        }
      },
      {rootMargin: '200px'},
    );
    io.observe(el);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, [url]);

  return (
    <span
      ref={ref}
      className={svg ? 'fe-icon' : 'fe-icon fe-icon-loading'}
      style={{width: size, height: size}}
      aria-hidden="true"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time trusted SVG assets
      dangerouslySetInnerHTML={svg ? {__html: svg} : undefined}
    />
  );
}

export default function Gallery({base}: {base: string}) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState<IconCategory>('architecture-service');
  const [limit, setLimit] = useState(BATCH);
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState('svg');
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  // debounce typing so 3,145 rows aren't refiltered per keystroke
  useEffect(() => {
    const t = setTimeout(() => setQuery(input), 150);
    return () => clearTimeout(t);
  }, [input]);

  const prefix = base.endsWith('/') ? base : `${base}/`;
  const url = (slug: string) => `${prefix}icon/${style}/${slug}.svg`;

  const icons = useMemo(() => {
    const q = query.trim().toLowerCase().replaceAll(' ', '-');
    return metadata.icons.filter(
      (e) => e.styles.includes(style) && (!q || e.slug.includes(q)),
    );
  }, [query, style]);

  const visible = icons.slice(0, limit);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset paging when the result set changes
  useEffect(() => setLimit(BATCH), [query, style]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || visible.length >= icons.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLimit((l) => l + BATCH);
        }
      },
      {rootMargin: '600px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible.length, icons.length]);

  const current = selected
    ? metadata.icons.find((e) => e.slug === selected)
    : undefined;
  const tabs = current ? snippets(current.slug, style) : [];
  const activeSnippet = tabs.find((t) => t.id === tab) ?? tabs[0];

  const open = (slug: string) => {
    setSelected(slug);
    setCopied(false);
    dialogRef.current?.showModal();
  };

  const copy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // roving arrow-key navigation inside the tab list
  const onTabKeys = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const idx = tabs.findIndex((t) => t.id === (activeSnippet?.id ?? 'svg'));
    const next =
      (idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setTab(tabs[next].id);
    const buttons = tablistRef.current?.querySelectorAll('button');
    (buttons?.[next] as HTMLButtonElement | undefined)?.focus();
  };

  return (
    <div className="fe-gallery">
      <style>{`
        .fe-gallery {--fe-ease: cubic-bezier(0.16, 1, 0.3, 1);}
        .fe-gallery .fe-controls {display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: stretch;}
        .fe-gallery input[type='search'] {flex: 1 1 14rem; min-height: 2.75rem; padding: 0 0.85rem; border: 1px solid var(--sl-color-gray-4); border-radius: 0.5rem; background: var(--sl-color-bg); color: var(--sl-color-text); font-size: var(--sl-text-sm); transition: border-color 150ms var(--fe-ease);}
        .fe-gallery input[type='search']:hover {border-color: var(--sl-color-gray-3);}
        .fe-gallery input[type='search']:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px; border-color: var(--sl-color-accent);}
        .fe-gallery .fe-styles {display: flex; margin: 0; padding: 0.2rem; gap: 0.2rem; border: 1px solid var(--sl-color-gray-4); border-radius: 0.5rem; background: var(--sl-color-gray-6);}
        .fe-gallery .fe-styles button {min-height: 2.35rem; padding: 0 0.9rem; border: 0; border-radius: 0.35rem; background: transparent; color: var(--sl-color-gray-2); cursor: pointer; font-size: var(--sl-text-sm); transition: background 150ms var(--fe-ease), color 150ms var(--fe-ease);}
        .fe-gallery .fe-styles button:hover {color: var(--sl-color-text);}
        .fe-gallery .fe-styles button:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px;}
        .fe-gallery .fe-styles button[aria-pressed='true'] {background: var(--sl-color-bg); color: var(--sl-color-text); font-weight: 600; box-shadow: 0 1px 2px rgb(0 0 0 / 0.12);}
        .fe-gallery .fe-count {margin: 0.85rem 0; color: var(--sl-color-gray-2); font-size: var(--sl-text-sm); font-variant-numeric: tabular-nums;}
        .fe-gallery .fe-grid {display: grid; grid-template-columns: repeat(auto-fill, minmax(3.25rem, 1fr)); gap: 0.4rem;}
        .fe-gallery .fe-cell {display: grid; place-items: center; min-width: 2.75rem; min-height: 2.75rem; padding: 0.45rem; border: 1px solid transparent; border-radius: 0.6rem; background: transparent; cursor: pointer; transition: background 150ms var(--fe-ease), border-color 150ms var(--fe-ease), transform 150ms var(--fe-ease);}
        .fe-gallery .fe-cell:hover {border-color: var(--sl-color-gray-4); background: var(--sl-color-gray-6);}
        .fe-gallery .fe-cell:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px;}
        .fe-gallery .fe-cell:active {transform: scale(0.94);}
        .fe-gallery .fe-icon {display: block;}
        .fe-gallery .fe-icon svg {width: 100%; height: 100%; display: block;}
        .fe-gallery .fe-icon-loading {border-radius: 0.4rem; background: var(--sl-color-gray-6);}
        .fe-gallery .fe-empty {padding: 3rem 1rem; text-align: center; color: var(--sl-color-gray-2); border: 1px dashed var(--sl-color-gray-5); border-radius: 0.75rem;}
        .fe-gallery .fe-empty code {color: var(--sl-color-text);}
        .fe-dialog {width: min(46rem, calc(100vw - 2rem)); border: 1px solid var(--sl-color-gray-4); border-radius: 0.75rem; background: var(--sl-color-bg); color: var(--sl-color-text); padding: 1.25rem;}
        .fe-dialog::backdrop {background: rgb(0 0 0 / 0.5);}
        .fe-dialog[open] {animation: fe-in 180ms var(--fe-ease);}
        @keyframes fe-in {from {opacity: 0; transform: translateY(8px) scale(0.98);} to {opacity: 1; transform: none;}}
        @media (prefers-reduced-motion: reduce) {
          .fe-dialog[open] {animation: none;}
          .fe-gallery .fe-cell, .fe-gallery .fe-styles button, .fe-gallery input[type='search'] {transition: none;}
        }
        .fe-dialog .fe-head {display: flex; align-items: center; gap: 0.85rem; margin: 0 0 1rem;}
        .fe-dialog .fe-head .fe-tile {display: grid; place-items: center; width: 3.5rem; height: 3.5rem; border-radius: 0.6rem; background: var(--sl-color-gray-6); border: 1px solid var(--sl-color-gray-5); flex: none;}
        .fe-dialog .fe-head h3 {margin: 0; font-size: var(--sl-text-lg); line-height: 1.3; flex: 1;}
        .fe-dialog .fe-head .fe-slug {display: block; color: var(--sl-color-gray-2); font-size: var(--sl-text-xs); font-family: var(--__sl-font-mono, monospace); font-weight: 400;}
        .fe-dialog .fe-close {min-width: 2.75rem; min-height: 2.75rem; border: 1px solid var(--sl-color-gray-4); background: transparent; color: var(--sl-color-text); border-radius: 0.5rem; cursor: pointer; transition: background 150ms var(--fe-ease);}
        .fe-dialog .fe-close:hover {background: var(--sl-color-gray-6);}
        .fe-dialog .fe-close:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px;}
        .fe-dialog .fe-tabs {display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.75rem;}
        .fe-dialog .fe-tabs button {min-height: 2.1rem; border: 1px solid var(--sl-color-gray-4); background: transparent; color: var(--sl-color-gray-2); border-radius: 0.45rem; padding: 0 0.7rem; font-size: var(--sl-text-xs); cursor: pointer; transition: background 150ms var(--fe-ease), color 150ms var(--fe-ease);}
        .fe-dialog .fe-tabs button:hover {color: var(--sl-color-text); background: var(--sl-color-gray-6);}
        .fe-dialog .fe-tabs button:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px;}
        .fe-dialog .fe-tabs button[aria-selected='true'] {background: var(--sl-color-text-accent); color: var(--sl-color-text-invert); border-color: var(--sl-color-text-accent); font-weight: 600;}
        .fe-dialog pre {margin: 0; padding: 1rem; border-radius: 0.5rem; border: 1px solid var(--sl-color-gray-5); background: var(--sl-color-gray-6); overflow-x: auto; font-size: var(--sl-text-xs); line-height: 1.65;}
        .fe-dialog .fe-actions {display: flex; justify-content: flex-end; margin-top: 0.75rem;}
        .fe-dialog .fe-copy {min-height: 2.75rem; border: 1px solid var(--sl-color-gray-4); background: var(--sl-color-gray-6); color: var(--sl-color-text); border-radius: 0.5rem; padding: 0 1rem; font-size: var(--sl-text-sm); cursor: pointer; transition: background 150ms var(--fe-ease), border-color 150ms var(--fe-ease), transform 100ms var(--fe-ease);}
        .fe-dialog .fe-copy:hover {border-color: var(--sl-color-gray-3);}
        .fe-dialog .fe-copy:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px;}
        .fe-dialog .fe-copy:active {transform: scale(0.97);}
        .fe-dialog .fe-copy[data-copied='true'] {border-color: var(--sl-color-green); color: var(--sl-color-green);}
      `}</style>

      <div className="fe-controls">
        <input
          type="search"
          placeholder={`Search ${metadata.count.toLocaleString()} icons by name`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Search icons"
        />
        <fieldset className="fe-styles" aria-label="Icon style">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === style}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </fieldset>
      </div>

      <p className="fe-count" aria-live="polite">
        {icons.length === metadata.count
          ? `${icons.length.toLocaleString()} icons`
          : `${icons.length.toLocaleString()} of ${metadata.count.toLocaleString()} icons`}
      </p>

      {icons.length === 0 ? (
        <p className="fe-empty">
          Nothing matches <code>{query}</code>. Try a simpler word, like
          <code> cat</code> or <code>heart</code>.
        </p>
      ) : (
        <>
          <div className="fe-grid">
            {visible.map((e) => (
              <button
                key={e.slug}
                type="button"
                className="fe-cell"
                title={e.name}
                aria-label={`${e.name}: show usage`}
                onClick={() => open(e.slug)}
              >
                <InlineIcon url={url(e.slug)} />
              </button>
            ))}
          </div>
          {visible.length < icons.length && (
            <div ref={sentinelRef} aria-hidden="true" style={{height: 1}} />
          )}
        </>
      )}

      <dialog
        ref={dialogRef}
        className="fe-dialog"
        onClose={() => setSelected(null)}
        aria-label={current ? `${current.name} usage` : 'Icon usage'}
      >
        {current && (
          <>
            <div className="fe-head">
              <span className="fe-tile">
                <InlineIcon url={url(current.slug)} size={38} />
              </span>
              <h3>
                {current.name}
                <span className="fe-slug">{current.slug}</span>
              </h3>
              <button
                type="button"
                className="fe-close"
                aria-label="Close"
                onClick={() => dialogRef.current?.close()}
              >
                Esc
              </button>
            </div>
            <div
              ref={tablistRef}
              className="fe-tabs"
              role="tablist"
              aria-label="Framework"
              onKeyDown={onTabKeys}
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={t.id === (activeSnippet?.id ?? 'svg')}
                  tabIndex={t.id === (activeSnippet?.id ?? 'svg') ? 0 : -1}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <pre>
              <code>{activeSnippet?.code}</code>
            </pre>
            <div className="fe-actions">
              <button
                type="button"
                className="fe-copy"
                data-copied={copied}
                onClick={copy}
              >
                {copied ? 'Copied to clipboard' : 'Copy snippet'}
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
