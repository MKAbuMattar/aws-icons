# @aws-icons/solid

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) as tree-shakeable,
typed SolidJS components — 3,145 icons in `flat`, `high-contrast`, and `modern` styles.
Ships DOM, SSR, and `solid`-condition JSX source builds.

## Install

```sh
pnpm add @aws-icons/solid
```

## Usage

```tsx
import {Rocket} from '@aws-icons/solid/flat';
// or per-icon: import Rocket from '@aws-icons/solid/modern/rocket';

<Rocket width={32} />
<Rocket title="Rocket launch" />  // accessible: role="img" + aria-label
```

Styles: `@aws-icons/solid/flat`, `/high-contrast`, `/modern`.
Extra props land on the root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
