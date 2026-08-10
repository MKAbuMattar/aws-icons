# @aws-icons/svelte

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) for Svelte 5 —
tree-shakeable icon data plus a single `Icon` component. 805 icons in
`architecture-group`, `architecture-service`, `category`, and `resource` sets.

## Install

```sh
pnpm add @aws-icons/svelte
```

## Usage

```svelte
<script>
  import {Icon} from '@aws-icons/svelte';
  import {AmazonEc2} from '@aws-icons/svelte/architecture-service';
  // or per-icon: import AmazonEc2 from '@aws-icons/svelte/resource/amazon-ec2-instance';
</script>

<Icon icon={AmazonEc2} width="32" />
<Icon icon={AmazonEc2} title="Amazon EC2" />  <!-- accessible label -->
```

Only the icons you import end up in your bundle. Extra attributes land on the
root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
