# @aws-icons/react-native

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as typed React Native components built on react-native-svg — 805 icons in `architecture-group`, `architecture-service`, `category`, `resource`, and `resource-dark` sets.

**Docs:** https://aws-icons.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@aws-icons/react-native) · **All packages:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Install

```sh
pnpm add @aws-icons/react-native
```

## Usage

```tsx
import {AmazonEc2} from '@aws-icons/react-native/architecture-service';
// or per-icon (no barrel): import AmazonEc2 from '@aws-icons/react-native/resource/amazon-ec2-instance';

<AmazonEc2 width={32} height={32} />
<AmazonEc2 title="Amazon EC2" />  // accessible label
```

Sets: `@aws-icons/react-native/architecture-service`, `/architecture-group`, `/category`, `/resource`, `/resource-dark`.
Requires the `react-native-svg` peer. Default size 24, override via props.
Icon names are the PascalCased slug (`amazon-ec2` → `AmazonEc2`).

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
