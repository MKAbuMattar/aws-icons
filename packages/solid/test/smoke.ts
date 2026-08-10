import assert from 'node:assert/strict';
import {renderToString} from 'solid-js/web';
// @ts-expect-error generated at build time
import {AmazonEc2} from '../dist/architecture-service/index.js';
// @ts-expect-error generated at build time
import ResourceInstance from '../dist/resource/icons/amazon-ec2-instance.js';

const plain = renderToString(() => AmazonEc2({}));
assert.ok(plain.includes('<svg'), 'renders an svg');
assert.ok(plain.includes('viewBox="0 0 64 64"'), 'keeps viewBox');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = renderToString(() =>
  ResourceInstance({title: 'EC2', class: 'x'}),
);
assert.ok(labeled.includes('aria-label="EC2"'), 'title becomes aria-label');
assert.ok(labeled.includes('class="x'), 'props pass through');

console.log('@aws-icons/solid smoke test passed');
