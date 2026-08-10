# aws-icon

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) — Microsoft's familiar,
packaged for every stack, with fully automated releases from the official AWS Architecture Icons set.

## Packages

| Package | Description |
|---|---|
| [`@aws-icons/svg`](packages/svg) | Optimized SVGs (4 icon sets) + typed metadata |
| [`@aws-icons/react`](packages/react) | Tree-shakeable typed React components |
| [`@aws-icons/preact`](packages/preact) | Tree-shakeable typed Preact components |
| [`@aws-icons/vue`](packages/vue) | Tree-shakeable typed Vue 3 components |
| [`@aws-icons/solid`](packages/solid) | SolidJS components (DOM, SSR, and `solid`-condition builds) |
| [`@aws-icons/svelte`](packages/svelte) | Svelte 5 `Icon` component + tree-shakeable icon data |
| [`@aws-icons/astro`](packages/astro) | Zero-JS Astro component, SVG inlined at build time |
| [`@aws-icons/angular`](packages/angular) | Standalone `awsIcon` directive (Angular 17+) |
| [`@aws-icons/lit`](packages/lit) | `<aws-icon>` LitElement + template helpers |
| [`@aws-icons/web-components`](packages/web-components) | Framework-less `<aws-icon>` custom element |
| [`@aws-icons/alpine`](packages/alpine) | Alpine.js directive + magic |
| [`@aws-icons/htmx`](packages/htmx) | Server handler serving icon fragments for htmx |

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
