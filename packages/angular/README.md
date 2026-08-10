# @aws-icons/angular

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) for Angular — a
standalone `awsIcon` directive with tree-shakeable icon data. 3,145 icons
in `flat`, `high-contrast`, and `modern` styles. Angular 17+.

## Install

```sh
pnpm add @aws-icons/angular
```

## Usage

```ts
import {Component} from '@angular/core';
import {AwsIconDirective, register} from '@aws-icons/angular';
import {Rocket} from '@aws-icons/angular/flat';

register(Rocket);

@Component({
  standalone: true,
  imports: [AwsIconDirective],
  template: `
    <span awsIcon="rocket"></span>
    <span awsIcon="rocket" iconStyle="modern" iconLabel="Rocket"></span>
  `,
})
export class AppComponent {}
```

Only registered icons end up in your bundle. Without `iconLabel` the svg is
`aria-hidden`. `iconHtml(name, style, label)` is exported for direct use.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
