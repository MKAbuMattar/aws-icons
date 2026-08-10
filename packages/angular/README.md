# @aws-icons/angular

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) for Angular — a
standalone `awsIcon` directive with tree-shakeable icon data. 805 icons
in `architecture-group`, `architecture-service`, `category`, and `resource` sets. Angular 17+.

## Install

```sh
pnpm add @aws-icons/angular
```

## Usage

```ts
import {Component} from '@angular/core';
import {AwsIconDirective, register} from '@aws-icons/angular';
import {AmazonEc2} from '@aws-icons/angular/architecture-service';

register(AmazonEc2);

@Component({
  standalone: true,
  imports: [AwsIconDirective],
  template: `
    <span awsIcon="amazon-ec2"></span>
    <span awsIcon="amazon-ec2" iconStyle="resource" iconLabel="Amazon EC2"></span>
  `,
})
export class AppComponent {}
```

Only registered icons end up in your bundle. Without `iconLabel` the svg is
`aria-hidden`. `iconHtml(name, style, label)` is exported for direct use.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
