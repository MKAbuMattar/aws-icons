# @aws-icons/web-components

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as a framework-less
`<aws-icon>` custom element — 805 icons in `flat`, `high-contrast`, and
`modern` styles. Works in any page, any framework, no build required.

## Install

```sh
pnpm add @aws-icons/web-components
```

## Usage

```js
import {defineAwsIcon, register} from '@aws-icons/web-components';
import {AmazonEc2} from '@aws-icons/web-components/architecture-service';

defineAwsIcon();   // defines <aws-icon>
register(AmazonEc2);      // makes it available by name
```

```html
<aws-icon name="amazon-ec2"></aws-icon>
<aws-icon name="amazon-ec2" variant="resource" label="AmazonEc2"></aws-icon>
```

Or skip the registry and set the icon directly:

```js
document.querySelector('aws-icon').icon = AmazonEc2;
```

Only imported icons end up in your bundle. Without `label` the svg is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
