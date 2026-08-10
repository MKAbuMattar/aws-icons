# @aws-icons/htmx

[AWS Architecture Icons](https://github.com/microsoft/aws-icon) for htmx — a
tiny server handler that serves icon SVG fragments for htmx to swap in.
3,145 icons in `flat`, `high-contrast`, and `modern` styles.

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
<span hx-get="/aws-icons/flat/rocket" hx-trigger="load"></span>
<span hx-get="/aws-icons/modern/party-popper?label=Party!" hx-trigger="load"></span>
```

Responses are sent with immutable cache headers. There's also a direct helper
for template engines: `await iconHtml('rocket', 'flat', 'Rocket')`.

## License

[MIT](https://github.com/MKAbuMattar/aws-icons/blob/main/LICENSE).
Icon assets © Microsoft, [MIT licensed](https://github.com/microsoft/aws-icons/blob/main/LICENSE).
