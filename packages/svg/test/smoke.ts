import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {getIcon, getIconPath, metadata} from '../src/index';

assert.ok(metadata.count > 700, 'metadata has all icons');
assert.equal(metadata.icons.length, metadata.count);
assert.deepEqual(metadata.styles, [
  'architecture-group',
  'architecture-service',
  'category',
  'resource',
]);

assert.equal(getIcon('amazon-ec2')?.name, 'Amazon EC2');
assert.equal(
  getIconPath('amazon-ec2', 'architecture-service'),
  '@aws-icons/svg/icons/architecture-service/amazon-ec2.svg',
);

const svg = fs.readFileSync(
  path.resolve(
    import.meta.dirname,
    '../icons/architecture-service/amazon-ec2.svg',
  ),
  'utf8',
);
assert.ok(svg.startsWith('<svg'), 'icon file is an svg');
assert.ok(svg.includes('viewBox='), 'viewBox preserved');

console.log('@aws-icons/svg smoke test passed');
