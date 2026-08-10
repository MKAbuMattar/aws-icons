import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {AmazonEc2} from '../dist/architecture-service/index.js';
// @ts-expect-error generated at build time
import ResourceInstance from '../dist/resource/icons/amazon-ec2-instance.js';
import awsIcon, {iconHtml, register} from '../src/index';

register(AmazonEc2, ResourceInstance);

const plain = iconHtml('amazon-ec2');
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = iconHtml('amazon-ec2-instance', 'resource', 'EC2 "1"');
assert.ok(labeled.includes('aria-label="EC2 &quot;1&quot;"'), 'label escaped');
assert.equal(iconHtml('does-not-exist' as never), '', 'unknown icon is empty');

// plugin wiring with a fake Alpine
const calls: string[] = [];
awsIcon({
  magic: (name: string) => calls.push(`magic:${name}`),
  directive: (name: string) => calls.push(`directive:${name}`),
});
assert.deepEqual(calls, ['magic:awsIcon', 'directive:aws-icon']);

console.log('@aws-icons/alpine smoke test passed');
