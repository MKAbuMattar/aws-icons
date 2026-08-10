# @aws-icons/vue

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) as tree-shakeable,
typed Vue 3 components — 3,145 icons in `flat`, `high-contrast`, and `modern` styles.
Dual ESM + CJS.

## Install

```sh
pnpm add @aws-icons/vue
```

## Usage

```vue
<script setup>
import {Rocket} from '@aws-icons/vue/flat';
// or per-icon: import Rocket from '@aws-icons/vue/modern/rocket';
</script>

<template>
  <Rocket width="32" />
  <Rocket title="Rocket launch" />  <!-- accessible: role="img" + aria-label -->
</template>
```

Styles: `@aws-icons/vue/flat`, `/high-contrast`, `/modern`.
Extra attributes land on the root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
