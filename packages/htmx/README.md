# @aws-icons/htmx

[AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) for htmx — a
tiny server handler that serves icon SVG fragments for htmx to swap in.
805 icons in `architecture-group`, `architecture-service`, `category`, and `resource` sets.

## Install

```sh
pnpm add @aws-icons/htmx
```

## Usage

Server (Express, or plain `node:http`):

```js
import express from 'express';
import {awsIconHandler} from '@aws-icons/htmx';

const app = express();
app.use(awsIconHandler());  // GET /aws-icons/:style/:slug?label=...
```

Page:

```html
<span hx-get="/aws-icons/architecture-service/amazon-ec2" hx-trigger="load"></span>
<span hx-get="/aws-icons/resource/aws-lambda?label=Lambda" hx-trigger="load"></span>
```

Responses are sent with immutable cache headers. There's also a direct helper
for template engines: `await iconHtml('amazon-ec2', 'architecture-service', 'Amazon EC2')`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
AWS Architecture Icons are © Amazon Web Services, Inc., provided under the [AWS icon terms](https://aws.amazon.com/architecture/icons/).
