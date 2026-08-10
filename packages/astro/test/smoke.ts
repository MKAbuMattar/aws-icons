import assert from 'node:assert/strict';
import {loadIconSvg} from '../src/load';

const plain = await loadIconSvg('amazon-ec2', 'architecture-service');
assert.ok(plain.startsWith('<svg'), 'loads an svg');
assert.ok(plain.includes('viewBox='), 'viewBox preserved');

const labeled = await loadIconSvg('amazon-ec2-instance', 'resource', {
  role: 'img',
  'aria-label': 'EC2 "launch"',
  class: 'x',
});
assert.ok(
  labeled.includes('aria-label="EC2 &quot;launch&quot;"'),
  'attrs escaped',
);
assert.ok(labeled.includes('class="x"'), 'attrs injected');

console.log('@aws-icons/astro smoke test passed');
