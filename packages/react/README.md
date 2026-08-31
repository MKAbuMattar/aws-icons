# @aws-icons/react

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as tree-shakeable,
typed React components — 805 icons in `architecture-group`, `architecture-service`, `category`, `resource`, and `resource-dark` sets.

Successor of the deprecated [`react-aws-icon`](https://www.npmjs.com/package/react-aws-icon) package. Dual ESM + CJS.

**Docs:** https://aws-icons.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@aws-icons/react) · **All packages:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Install

```sh
pnpm add @aws-icons/react
```

## Usage

```tsx
import {AmazonEc2} from '@aws-icons/react/architecture-service';
// or per-icon (no barrel): import AmazonEc2 from '@aws-icons/react/resource/amazon-ec2-instance';

<AmazonEc2 width={32} />                     // decorative: aria-hidden
<AmazonEc2 title="Amazon EC2" />          // accessible: role="img" + aria-label
```

Styles: `@aws-icons/react/architecture-service`, `/architecture-group`, `/category`, `/resource`, `/resource-dark`.
Every component forwards its ref and accepts all `SVGProps<SVGSVGElement>`.
Icon names are the PascalCased slug (`amazon-ec2` → `AmazonEc2`).

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
