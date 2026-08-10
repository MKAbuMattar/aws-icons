# @aws-icons/alpine

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) for Alpine.js —
an `x-aws-icon` directive and `$awsIcon` magic with tree-shakeable icon
data. 3,145 icons in `flat`, `high-contrast`, and `modern` styles.

## Install

```sh
pnpm add @aws-icons/alpine
```

## Usage

```js
import Alpine from 'alpinejs';
import awsIcon, {register} from '@aws-icons/alpine';
import {Rocket} from '@aws-icons/alpine/flat';

register(Rocket);
Alpine.plugin(awsIcon);
Alpine.start();
```

```html
<span x-aws-icon="'rocket'"></span>
<span x-aws-icon="{name: 'rocket', style: 'modern', label: 'Rocket'}"></span>
<span x-data x-html="$awsIcon('rocket', 'flat')"></span>
```

Only registered icons end up in your bundle. Without `label` the svg is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
