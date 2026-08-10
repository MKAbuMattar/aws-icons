# @aws-icons/sprite

[AWS Architecture Icons](https://github.com/microsoft/fluentui-icon) as SVG symbol sprites — one `<use href>` sheet per set, ideal for pages with many icons — 3,145 icons in 5 sets.

## Install

```sh
pnpm add @aws-icons/sprite
```

## Usage

```html
<!-- copy dist/flat.svg into your static assets, then: -->
<svg width="32" height="32"><use href="/sprites/flat.svg#rocket" /></svg>
```

```ts
import {spriteHref} from "@aws-icons/sprite";
spriteHref("/sprites/flat.svg", "rocket"); // "/sprites/flat.svg#rocket"
```

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-icon/blob/main/LICENSE).
