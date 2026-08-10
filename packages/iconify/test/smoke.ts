import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '../dist');

for (const set of [
  'architecture-group',
  'architecture-service',
  'category',
  'resource',
  'resource-dark',
]) {
  const col = JSON.parse(
    fs.readFileSync(path.join(dist, `${set}.json`), 'utf8'),
  );
  assert.equal(col.prefix, `aws-icons-${set}`);
  const slugs = Object.keys(col.icons);
  assert.ok(slugs.length > 10, `${set} has icons`);
  const icon = col.icons[slugs[0]];
  assert.ok(icon.body.includes('<'), 'body is inner svg');
  assert.ok(icon.width > 0 && icon.height > 0, 'sized from viewBox');
}

const {sets, prefix} = await import('../dist/index.js');
assert.deepEqual(
  [...sets],
  [
    'architecture-group',
    'architecture-service',
    'category',
    'resource',
    'resource-dark',
  ],
);
assert.equal(prefix('architecture-service'), 'aws-icons-architecture-service');

console.log('@aws-icons/iconify smoke test passed');
