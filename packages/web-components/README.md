# @aws-icons/web-components

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) as a framework-less
`<aws-icon>` custom element — 3,145 icons in `flat`, `high-contrast`, and
`modern` styles. Works in any page, any framework, no build required.

## Install

```sh
pnpm add @aws-icons/web-components
```

## Usage

```js
import {defineAwsIcon, register} from '@aws-icons/web-components';
import {Rocket} from '@aws-icons/web-components/flat';

defineAwsIcon();   // defines <aws-icon>
register(Rocket);      // makes it available by name
```

```html
<aws-icon name="rocket"></aws-icon>
<aws-icon name="rocket" variant="modern" label="Rocket"></aws-icon>
```

Or skip the registry and set the icon directly:

```js
document.querySelector('aws-icon').icon = Rocket;
```

Only imported icons end up in your bundle. Without `label` the svg is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
