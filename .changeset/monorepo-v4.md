---
'@aws-icons/svg': major
'@aws-icons/react': major
'@aws-icons/preact': major
'@aws-icons/vue': major
'@aws-icons/solid': major
'@aws-icons/svelte': major
'@aws-icons/astro': major
'@aws-icons/angular': major
'@aws-icons/lit': major
'@aws-icons/web-components': major
'@aws-icons/alpine': major
'@aws-icons/htmx': major
---

Monorepo consolidation — `aws-icons` and `aws-react-icons` move to the
`@aws-icons` scope with ten new framework packages, all generated from the
official AWS Architecture Icons set (805 icons, 4 sets: architecture-group,
architecture-service, category, resource):

- `aws-icons` → `@aws-icons/svg`: typed metadata, `getIcon`/`getIconPath`, dual ESM+CJS
- `aws-react-icons` → `@aws-icons/react`: tree-shakeable per-set entries, dual ESM+CJS
- New: `/preact`, `/vue`, `/solid`, `/svelte`, `/astro`, `/angular`, `/lit`,
  `/web-components`, `/alpine`, `/htmx`
