# @aws-icons/iconify

[AWS Architecture Icons](https://github.com/microsoft/fluentui-icon) as Iconify JSON collections — drop into unplugin-icons, the Tailwind Iconify plugin, or any Iconify component — 3,145 icons in 5 sets.

**Docs:** https://aws-icons.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@aws-icons/iconify) · **All packages:** [@aws-icons](https://www.npmjs.com/org/aws-icons)

## Install

```sh
pnpm add @aws-icons/iconify
```

## Usage

```ts
// unplugin-icons (vite.config.ts)
import Icons from "unplugin-icons/vite";
import {ExternalPackageIconLoader} from "unplugin-icons/loaders";

Icons({customCollections: ExternalPackageIconLoader("@aws-icons/iconify")});
```

```ts
// or register manually with any Iconify component:
import {addCollection} from "@iconify/react";
import flat from "@aws-icons/iconify/flat.json";
addCollection(flat);
// <Icon icon="aws-icons-flat:rocket" />
```

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-icon/blob/main/LICENSE).
