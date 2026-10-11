# @aws-icons/iconify

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) as Iconify JSON collections — drop into unplugin-icons, the Tailwind Iconify plugin, or any Iconify component — 805 icons in `architecture-group`, `architecture-service`, `category`, `resource`, and `resource-dark` sets.

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
import service from "@aws-icons/iconify/architecture-service.json";
addCollection(service);
// <Icon icon="aws-icons-architecture-service:amazon-ec2" />
```

One JSON collection per set: `./architecture-group.json`, `./architecture-service.json`, `./category.json`, `./resource.json`, `./resource-dark.json`. Collection prefixes follow `aws-icons-<set>`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
