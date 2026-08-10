# @aws-icons/astro

## 4.0.0-beta.0

### Major Changes

- 1708546: Monorepo consolidation — `aws-icons` and `aws-react-icons` move to the
  `@aws-icons` scope with ten new framework packages, all generated from the
  official AWS Architecture Icons set (805 icons, 4 sets: architecture-group,
  architecture-service, category, resource):

  - `aws-icons` → `@aws-icons/svg`: typed metadata, `getIcon`/`getIconPath`, dual ESM+CJS
  - `aws-react-icons` → `@aws-icons/react`: tree-shakeable per-set entries, dual ESM+CJS
  - New: `/preact`, `/vue`, `/solid`, `/svelte`, `/astro`, `/angular`, `/lit`,
    `/web-components`, `/alpine`, `/htmx`

### Patch Changes

- Updated dependencies [1708546]
  - @aws-icons/svg@4.0.0-beta.0
