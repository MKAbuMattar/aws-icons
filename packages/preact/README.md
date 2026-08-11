# @aws-icons/preact

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as tree-shakeable,
typed Preact components — 805 icons in `architecture-group`, `architecture-service`, `category`, and `resource` sets.
Dual ESM + CJS. Preact 10+.

**Docs:** https://aws-icons.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@aws-icons/preact) · **All packages:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Install

```sh
pnpm add @aws-icons/preact
```

## Usage

```tsx
import {AmazonEc2} from '@aws-icons/preact/architecture-service';
// or per-icon: import AmazonEc2 from '@aws-icons/preact/resource/amazon-ec2-instance';

<AmazonEc2 width={32} />
<AmazonEc2 title="Amazon EC2" />  // accessible: role="img" + aria-label
```

Styles: `@aws-icons/preact/architecture-service`, `/architecture-group`, `/category`, `/resource`.
Extra props land on the root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
