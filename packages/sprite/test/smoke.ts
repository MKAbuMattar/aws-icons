import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spriteHref, spritePath} from '../src/index';

const dist = path.resolve(import.meta.dirname, '../dist');

const flat = fs.readFileSync(
  path.join(dist, 'architecture-service.svg'),
  'utf8',
);
assert.ok(flat.startsWith('<svg'), 'sprite is an svg');
assert.ok(
  flat.includes('<symbol id="amazon-ec2" viewBox="0 0 64 64">'),
  'rocket symbol',
);
assert.ok((flat.match(/<symbol /g) ?? []).length > 250, 'all symbols present');

assert.equal(
  spriteHref('/sprites/architecture-service.svg', 'amazon-ec2'),
  '/sprites/architecture-service.svg#amazon-ec2',
);
assert.equal(
  spritePath('architecture-service'),
  '@aws-icons/sprite/architecture-service.svg',
);

console.log('@aws-icons/sprite smoke test passed');
