import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';
// lit's node build ships DOM shims, so this works without a browser
import {iconSvg, AwsIconElement, register} from '../src/index';

register(Rocket, ModernRocket);

const plain = iconSvg(Rocket);
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = iconSvg(ModernRocket, 'Rocket "1"');
assert.ok(
  labeled.includes('aria-label="Rocket &quot;1&quot;"'),
  'label escaped',
);

assert.equal(typeof AwsIconElement, 'function', 'element class exports');
assert.ok(
  Object.hasOwn(AwsIconElement.properties, 'name'),
  'reactive properties declared',
);

console.log('@aws-icons/lit smoke test passed');
