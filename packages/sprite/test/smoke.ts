import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spriteHref, spritePath} from '../src/index';

const dist = path.resolve(import.meta.dirname, '../dist');

const sprite = fs.readFileSync(
  path.join(dist, 'architecture-service.svg'),
  'utf8',
);
assert.ok(sprite.startsWith('<svg'), 'sprite is an svg');
assert.ok(
  sprite.includes('<symbol id="amazon-ec2" viewBox="0 0 64 64">'),
  'amazon-ec2 symbol',
);
assert.ok(
  (sprite.match(/<symbol /g) ?? []).length > 250,
  'all symbols present',
);

assert.equal(
  spriteHref('/sprites/architecture-service.svg', 'amazon-ec2'),
  '/sprites/architecture-service.svg#amazon-ec2',
);
assert.equal(
  spritePath('architecture-service'),
  '@aws-icons/sprite/architecture-service.svg',
);

console.log('@aws-icons/sprite smoke test passed');
