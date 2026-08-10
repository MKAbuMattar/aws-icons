import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {AmazonEc2} from '../dist/architecture-service/index.js';
// @ts-expect-error generated at build time
import ResourceInstance from '../dist/resource/icons/amazon-ec2-instance.js';
// lit's node build ships DOM shims, so this works without a browser
import {AwsIconElement, iconSvg, register} from '../src/index';

register(AmazonEc2, ResourceInstance);

const plain = iconSvg(AmazonEc2);
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = iconSvg(ResourceInstance, 'EC2 "1"');
assert.ok(labeled.includes('aria-label="EC2 &quot;1&quot;"'), 'label escaped');

assert.equal(typeof AwsIconElement, 'function', 'element class exports');
assert.ok(
  Object.hasOwn(AwsIconElement.properties, 'name'),
  'reactive properties declared',
);

console.log('@aws-icons/lit smoke test passed');
