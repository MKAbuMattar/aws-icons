// JIT fallback so the partial-Ivy declarations evaluate outside Angular's linker
import '@angular/compiler';
import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {AmazonEc2} from '../dist/architecture-service/index.js';
// @ts-expect-error generated at build time
import ResourceInstance from '../dist/resource/icons/amazon-ec2-instance.js';
// compiled FESM — partial-Ivy output importable in plain node
// @ts-expect-error built by ng-packagr
import {
  AwsIconDirective,
  iconHtml,
  register,
} from '../lib/fesm2022/aws-icons-angular.mjs';

register(AmazonEc2, ResourceInstance);

const plain = iconHtml('amazon-ec2');
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = iconHtml('amazon-ec2-instance', 'resource', 'EC2 "1"');
assert.ok(labeled.includes('aria-label="EC2 &quot;1&quot;"'), 'label escaped');
assert.equal(iconHtml('nope'), '', 'unknown icon is empty');

assert.equal(typeof AwsIconDirective, 'function', 'directive exports');
// partial-Ivy compilation marker consumed by the Angular linker
assert.ok(
  'ɵdir' in AwsIconDirective || 'ɵfac' in AwsIconDirective,
  'Ivy partial compilation present',
);

console.log('@aws-icons/angular smoke test passed');
