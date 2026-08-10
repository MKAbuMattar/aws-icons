# @aws-icons/astro

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) for Astro —
the SVG is inlined at build time, so pages ship **zero client JS**.

## Install

```sh
pnpm add @aws-icons/astro
```

## Usage

```astro
---
import {Icon} from '@aws-icons/astro';
---

<Icon name="rocket" />
<Icon name="rocket" variant="high-contrast" width="32" />
<Icon name="party-popper" title="Celebration!" />
```

- `name` — typed icon slug (3,145 available)
- `variant` — `flat` (default) · `high-contrast` · `modern`
- `title` — accessible label; omitted → `aria-hidden`
- any other attribute is passed to the root `<svg>`

Need the raw string (endpoints, MDX helpers)? `loadIconSvg(name, variant, attrs)`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
