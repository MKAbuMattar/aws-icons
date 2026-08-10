import assert from 'node:assert/strict';
import {loadIconSvg} from '../src/load';

const plain = await loadIconSvg('rocket', 'flat');
assert.ok(plain.startsWith('<svg'), 'loads an svg');
assert.ok(plain.includes('viewBox='), 'viewBox preserved');

const labeled = await loadIconSvg('rocket', 'modern', {
  role: 'img',
  'aria-label': 'Rocket "launch"',
  class: 'x',
});
assert.ok(
  labeled.includes('aria-label="Rocket &quot;launch&quot;"'),
  'attrs escaped',
);
assert.ok(labeled.includes('class="x"'), 'attrs injected');

console.log('@aws-icons/astro smoke test passed');
