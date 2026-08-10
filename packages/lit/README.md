# @aws-icons/lit

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) for Lit — a
`<aws-icon>` LitElement plus template helpers, with tree-shakeable icon
data. 3,145 icons in `flat`, `high-contrast`, and `modern` styles.

## Install

```sh
pnpm add @aws-icons/lit
```

## Usage

As an element:

```js
import {defineAwsIcon, register} from '@aws-icons/lit';
import {Rocket} from '@aws-icons/lit/flat';

register(Rocket);
defineAwsIcon();
```

```html
<aws-icon name="rocket"></aws-icon>
<aws-icon name="rocket" variant="modern" label="Rocket"></aws-icon>
```

Inside your own templates:

```js
import {html} from 'lit';
import {iconTemplate} from '@aws-icons/lit';
import {Rocket} from '@aws-icons/lit/flat';

html`<button>${iconTemplate(Rocket, 'Launch')} Launch</button>`;
```

Only imported icons end up in your bundle. Without `label` the svg is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
