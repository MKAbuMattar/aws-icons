# @aws-icons/svg

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) as optimized SVGs —
3,145 icons in `flat`, `high-contrast`, and `modern` styles — with typed metadata.

Successor of the deprecated [`aws-icon`](https://www.npmjs.com/package/aws-icon) package.

## Install

```sh
pnpm add @aws-icons/svg
```

## Usage

```ts
import {metadata, getIcon, getIconPath} from '@aws-icons/svg';
import type {IconSlug, IconCategory} from '@aws-icons/svg';

getIcon('rocket');                 // {slug: 'rocket', name: 'Rocket', styles: [...]}
getIconPath('rocket', 'flat');     // '@aws-icons/svg/icons/flat/rocket.svg'
```

Import an SVG directly (bundler):

```ts
import rocket from '@aws-icons/svg/icons/flat/rocket.svg';
```

Or grab the raw metadata: `import meta from '@aws-icons/svg/metadata.json'`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
