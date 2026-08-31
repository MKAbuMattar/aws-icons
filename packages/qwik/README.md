# @aws-icons/qwik

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as typed Qwik components (ESM only) — 805 icons in `architecture-group`, `architecture-service`, `category`, `resource`, and `resource-dark` sets.

**Docs:** https://aws-icons.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@aws-icons/qwik) · **All packages:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Install

```sh
pnpm add @aws-icons/qwik
```

## Usage

```tsx
import {AmazonEc2} from '@aws-icons/qwik/architecture-service';
// or per-icon (no barrel): import AmazonEc2 from '@aws-icons/qwik/resource/amazon-ec2-instance';

<AmazonEc2 width={32} />                     // decorative: aria-hidden
<AmazonEc2 title="Amazon EC2" />          // accessible: role="img" + aria-label
```

Sets: `@aws-icons/qwik/architecture-service`, `/architecture-group`, `/category`, `/resource`, `/resource-dark`.
Icon names are the PascalCased slug (`amazon-ec2` → `AmazonEc2`).

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
