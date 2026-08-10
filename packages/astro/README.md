# @aws-icons/astro

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) for Astro —
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

<Icon name="amazon-ec2" />
<Icon name="amazon-ec2" variant="architecture-group" width="32" />
<Icon name="aws-lambda" title="Serverless!" />
```

- `name` — typed icon slug (805 available)
- `variant` — `architecture-service` (default) · `architecture-group` · `category` · `resource`
- `title` — accessible label; omitted → `aria-hidden`
- any other attribute is passed to the root `<svg>`

Need the raw string (endpoints, MDX helpers)? `loadIconSvg(name, variant, attrs)`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
