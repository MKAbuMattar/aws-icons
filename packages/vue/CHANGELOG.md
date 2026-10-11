# @aws-icons/vue

## 4.1.0

### Minor Changes

- 2e39f96: - `"./package.json"` added to every package's exports map.
  - `engines.node >= 18` declared (publint clean).
- 748da60: - **New `resource-dark` set** — the 47 resource icons AWS ships with explicit
  dark-theme artwork, available in every package (`@aws-icons/react/resource-dark`, ...).
  - **Four new packages**: Iconify JSON collections, SVG symbol sprites,
    React Native components (react-native-svg), and Qwik components.

## 4.0.0

### Major Changes

- 1708546: Monorepo consolidation — `aws-icons` and `aws-react-icons` move to the
  `@aws-icons` scope with ten new framework packages, all generated from the
  official AWS Architecture Icons set (805 icons, 4 sets: architecture-group,
  architecture-service, category, resource):

  - `aws-icons` → `@aws-icons/svg`: typed metadata, `getIcon`/`getIconPath`, dual ESM+CJS
  - `aws-react-icons` → `@aws-icons/react`: tree-shakeable per-set entries, dual ESM+CJS
  - New: `/preact`, `/vue`, `/solid`, `/svelte`, `/astro`, `/angular`, `/lit`,
    `/web-components`, `/alpine`, `/htmx`
