# aws-icons

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) — the official
icon set for AWS architecture diagrams — packaged for every stack, with fully
automated releases.

**Docs:** https://aws-icons.mkabumattar.com · **All packages on npm:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Packages

| Package | Description | npm |
|---|---|---|
| [`@aws-icons/svg`](packages/svg) | Optimized SVGs (4 icon sets) + typed metadata | [npm](https://www.npmjs.com/package/@aws-icons/svg) |
| [`@aws-icons/react`](packages/react) | Tree-shakeable typed React components | [npm](https://www.npmjs.com/package/@aws-icons/react) |
| [`@aws-icons/preact`](packages/preact) | Tree-shakeable typed Preact components | [npm](https://www.npmjs.com/package/@aws-icons/preact) |
| [`@aws-icons/vue`](packages/vue) | Tree-shakeable typed Vue 3 components | [npm](https://www.npmjs.com/package/@aws-icons/vue) |
| [`@aws-icons/solid`](packages/solid) | SolidJS components (DOM, SSR, and `solid`-condition builds) | [npm](https://www.npmjs.com/package/@aws-icons/solid) |
| [`@aws-icons/svelte`](packages/svelte) | Svelte 5 `Icon` component + tree-shakeable icon data | [npm](https://www.npmjs.com/package/@aws-icons/svelte) |
| [`@aws-icons/astro`](packages/astro) | Zero-JS Astro component, SVG inlined at build time | [npm](https://www.npmjs.com/package/@aws-icons/astro) |
| [`@aws-icons/angular`](packages/angular) | Standalone `awsIcon` directive (Angular 17+) | [npm](https://www.npmjs.com/package/@aws-icons/angular) |
| [`@aws-icons/lit`](packages/lit) | `<aws-icon>` LitElement + template helpers | [npm](https://www.npmjs.com/package/@aws-icons/lit) |
| [`@aws-icons/web-components`](packages/web-components) | Framework-less `<aws-icon>` custom element | [npm](https://www.npmjs.com/package/@aws-icons/web-components) |
| [`@aws-icons/alpine`](packages/alpine) | Alpine.js directive + magic | [npm](https://www.npmjs.com/package/@aws-icons/alpine) |
| [`@aws-icons/htmx`](packages/htmx) | Server handler serving icon fragments for htmx | [npm](https://www.npmjs.com/package/@aws-icons/htmx) |
| [`@aws-icons/react-native`](packages/react-native) | React Native components on react-native-svg | [npm](https://www.npmjs.com/package/@aws-icons/react-native) |
| [`@aws-icons/qwik`](packages/qwik) | Typed Qwik components | [npm](https://www.npmjs.com/package/@aws-icons/qwik) |
| [`@aws-icons/iconify`](packages/iconify) | Iconify JSON collections (unplugin-icons, Tailwind) | [npm](https://www.npmjs.com/package/@aws-icons/iconify) |
| [`@aws-icons/sprite`](packages/sprite) | SVG symbol sprites for use-href sheets | [npm](https://www.npmjs.com/package/@aws-icons/sprite) |

## Release channels

- `latest` — stable, published when the auto-generated Version Packages PR merges
- `beta` — pre-releases from the `next` branch (`x.y.z-beta.N`)
- `canary` — snapshot of every `main` merge (`@aws-icons/react@canary`)

New upstream icon land automatically: a weekly workflow syncs
the official AWS Architecture Icons package, opens a PR, and merging it rides the release train.
No release step in this repo is manual.

## Development

```sh
pnpm install
pnpm sync      # scrape upstream → optimize → assets/ + metadata.json
pnpm build     # build all packages
pnpm lint
```

Previously: [`archived-aws-icons`](https://github.com/MKAbuMattar/archived-aws-icons),
[`archived-aws-react-icons`](https://github.com/MKAbuMattar/archived-aws-react-icons),
[`archived-aws-icon-docs`](https://github.com/MKAbuMattar/archived-aws-icon-docs).
The old npm names `aws-icons` and `aws-react-icons` are deprecated in favor of the scope.

AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
This repo and packages: [MIT](LICENSE).
