import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {AmazonEc2} from '../dist/architecture-service/index.js';
// @ts-expect-error generated at build time
import ModernAmazonEc2 from '../dist/resource/icons/amazon-ec2-instance.js';

const plain = AmazonEc2({}) as {type: unknown; props: Record<string, unknown>};
assert.equal(plain.type, 'svg', 'renders an svg jsx node');
assert.equal(plain.props.viewBox, '0 0 64 64', 'keeps viewBox');
assert.equal(plain.props['aria-hidden'], 'true', 'decorative by default');
assert.ok(
  String(plain.props.dangerouslySetInnerHTML).includes('<path'),
  'body present',
);

const labeled = ModernAmazonEc2({title: 'AmazonEc2', class: 'x'}) as {
  props: Record<string, unknown>;
};
assert.equal(
  labeled.props['aria-label'],
  'AmazonEc2',
  'title becomes aria-label',
);
assert.equal(
  labeled.props['aria-hidden'],
  undefined,
  'labeled icon not hidden',
);
assert.equal(labeled.props.class, 'x', 'props pass through');

console.log('@aws-icons/qwik smoke test passed');
