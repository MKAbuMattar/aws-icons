# @aws-icons/react

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) as tree-shakeable,
typed React components — 3,145 icons in `flat`, `high-contrast`, and `modern` styles.

Successor of the deprecated [`react-aws-icon`](https://www.npmjs.com/package/react-aws-icon) package. Dual ESM + CJS.

## Install

```sh
pnpm add @aws-icons/react
```

## Usage

```tsx
import {Rocket} from '@aws-icons/react/flat';
// or per-icon (no barrel): import Rocket from '@aws-icons/react/modern/rocket';

<Rocket width={32} />                     // decorative: aria-hidden
<Rocket title="Rocket launch" />          // accessible: role="img" + aria-label
```

Styles: `@aws-icons/react/flat`, `/high-contrast`, `/modern`.
Every component forwards its ref and accepts all `SVGProps<SVGSVGElement>`.
Icon names are the PascalCased slug (`1st-place-medal` → `Icon1stPlaceMedal`).

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
