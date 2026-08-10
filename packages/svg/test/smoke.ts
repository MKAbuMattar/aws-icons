import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {getIcon, getIconPath, metadata} from '../src/index';

assert.ok(metadata.count > 3000, 'metadata has all icons');
assert.equal(metadata.icons.length, metadata.count);
assert.deepEqual(metadata.styles, ['architecture-group', 'architecture-service', 'category', 'resource']);

assert.equal(getIcon('rocket')?.name, 'Rocket');
assert.equal(
  getIconPath('rocket', 'flat'),
  '@aws-icons/svg/icons/flat/rocket.svg',
);

const svg = fs.readFileSync(
  path.resolve(import.meta.dirname, '../icons/flat/rocket.svg'),
  'utf8',
);
assert.ok(svg.startsWith('<svg'), 'icon file is an svg');
assert.ok(svg.includes('viewBox='), 'viewBox preserved');

console.log('@aws-icons/svg smoke test passed');
