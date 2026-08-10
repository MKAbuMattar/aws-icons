import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';
import awsIcon, {iconHtml, register} from '../src/index';

register(Rocket, ModernRocket);

const plain = iconHtml('rocket');
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = iconHtml('rocket', 'modern', 'Rocket "1"');
assert.ok(
  labeled.includes('aria-label="Rocket &quot;1&quot;"'),
  'label escaped',
);
assert.equal(iconHtml('does-not-exist' as never), '', 'unknown icon is empty');

// plugin wiring with a fake Alpine
const calls: string[] = [];
awsIcon({
  magic: (name: string) => calls.push(`magic:${name}`),
  directive: (name: string) => calls.push(`directive:${name}`),
});
assert.deepEqual(calls, ['magic:awsIcon', 'directive:aws-icon']);

console.log('@aws-icons/alpine smoke test passed');
