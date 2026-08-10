import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
// @ts-expect-error generated at build time
import {AmazonEc2} from '../dist/architecture-service/index.js';
// @ts-expect-error generated at build time
import ResourceInstance from '../dist/resource/icons/amazon-ec2-instance.js';

const flat = renderToStaticMarkup(createElement(AmazonEc2));
assert.ok(flat.startsWith('<svg'), 'renders an svg');
assert.ok(flat.includes('viewBox="0 0 64 64"'), 'keeps viewBox');
assert.ok(flat.includes('aria-hidden="true"'), 'decorative by default');

const labeled = renderToStaticMarkup(
  createElement(ResourceInstance, {title: 'EC2', className: 'x'}),
);
assert.ok(labeled.includes('aria-label="EC2"'), 'title becomes aria-label');
assert.ok(!labeled.includes('aria-hidden'), 'labeled icon is not hidden');
assert.ok(labeled.includes('class="x"'), 'props pass through');

console.log('@aws-icons/react smoke test passed');
