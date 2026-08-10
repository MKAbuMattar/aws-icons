# @aws-icons/svelte

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) for Svelte 5 —
tree-shakeable icon data plus a single `Icon` component. 3,145 icons in
`flat`, `high-contrast`, and `modern` styles.

## Install

```sh
pnpm add @aws-icons/svelte
```

## Usage

```svelte
<script>
  import {Icon} from '@aws-icons/svelte';
  import {Rocket} from '@aws-icons/svelte/flat';
  // or per-icon: import Rocket from '@aws-icons/svelte/modern/rocket';
</script>

<Icon icon={Rocket} width="32" />
<Icon icon={Rocket} title="Rocket launch" />  <!-- accessible label -->
```

Only the icons you import end up in your bundle. Extra attributes land on the
root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
