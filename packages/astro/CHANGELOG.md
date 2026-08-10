# @aws-icons/astro

## 2.0.0

### Major Changes

- 9bfbe2d: Monorepo consolidation — the `aws-icon` and `react-aws-icon` packages
  move to the `@aws-icon` scope with a new Astro package:

  - `aws-icon` → `@aws-icons/svg`: typed metadata, `getIcon`/`getIconPath`
    helpers, dual ESM+CJS.
  - `react-aws-icon` → `@aws-icons/react`: tree-shakeable per-style entries
    (`/flat`, `/high-contrast`, `/modern`), per-icon imports, dual ESM+CJS,
    `title` prop for accessible labels.
  - New `@aws-icons/astro`: build-time inlined SVG, zero client JS.

### Patch Changes

- Updated dependencies [9bfbe2d]
  - @aws-icons/svg@2.0.0
