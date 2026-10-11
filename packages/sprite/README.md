# @aws-icons/sprite

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as SVG symbol sprites — one `<use href>` sheet per set, ideal for pages with many icons — 805 icons in `architecture-group`, `architecture-service`, `category`, `resource`, and `resource-dark` sets.

**Docs:** https://aws-icons.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@aws-icons/sprite) · **All packages:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Install

```sh
pnpm add @aws-icons/sprite
```

## Usage

```html
<!-- copy dist/architecture-service.svg into your static assets, then: -->
<svg width="32" height="32"><use href="/sprites/architecture-service.svg#amazon-ec2" /></svg>
```

```ts
import {spriteHref} from "@aws-icons/sprite";
spriteHref("/sprites/architecture-service.svg", "amazon-ec2"); // "/sprites/architecture-service.svg#amazon-ec2"
```

One sprite per set: `./architecture-group.svg`, `./architecture-service.svg`, `./category.svg`, `./resource.svg`, `./resource-dark.svg`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
