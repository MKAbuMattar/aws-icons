import assert from 'node:assert/strict';
import {awsIconHandler, iconHtml} from '../src/index';

const svg = await iconHtml('amazon-ec2');
assert.ok(svg.startsWith('<svg'), 'serves an svg fragment');
assert.ok(svg.includes('aria-hidden="true"'), 'decorative by default');

const labeled = await iconHtml('amazon-ec2-instance', 'resource', 'EC2 "1"');
assert.ok(labeled.includes('aria-label="EC2 &quot;1&quot;"'), 'label escaped');

const handler = awsIconHandler();
const call = async (url: string) => {
  const headers: Record<string, string> = {};
  let body = '';
  let statusCode = 200;
  await handler(
    {url} as never,
    {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      end: (chunk?: string) => {
        body = chunk ?? '';
      },
      get statusCode() {
        return statusCode;
      },
      set statusCode(v: number) {
        statusCode = v;
      },
    } as never,
  );
  return {statusCode, headers, body};
};

const ok = await call('/aws-icons/architecture-service/amazon-ec2?label=EC2');
assert.equal(ok.statusCode, 200);
assert.ok(ok.body.includes('aria-label="EC2"'), 'handler serves labeled svg');
assert.ok(ok.headers['Cache-Control']?.includes('immutable'), 'cacheable');

const missing = await call('/aws-icons/architecture-service/not-a-real-icon');
assert.equal(missing.statusCode, 404, 'unknown slug is 404');

const traversal = await call(
  '/aws-icons/architecture-service/..%2F..%2Fpackage',
);
assert.equal(traversal.statusCode, 404, 'path traversal rejected');

console.log('@aws-icons/htmx smoke test passed');
