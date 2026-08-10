import assert from 'node:assert/strict';
import {Window} from 'happy-dom';

const window = new Window();
Object.assign(globalThis, {
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  document: window.document,
});

const {defineAwsIcon, register} = await import('../dist/index.js');
// @ts-expect-error generated at build time
const {AmazonEc2} = await import('../dist/architecture-service/index.js');
// @ts-expect-error generated at build time
const {default: ResourceInstance} = await import(
  '../dist/resource/icons/amazon-ec2-instance.js'
);

assert.equal(AmazonEc2.slug, 'amazon-ec2');
assert.equal(AmazonEc2.style, 'architecture-service');

defineAwsIcon();
register(AmazonEc2, ResourceInstance);

const el = document.createElement('aws-icon');
el.setAttribute('name', 'amazon-ec2');
document.body.appendChild(el);
assert.ok(el.innerHTML.includes('<svg'), 'renders registered icon by name');
assert.ok(el.innerHTML.includes('aria-hidden'), 'decorative by default');

el.setAttribute('variant', 'resource');
el.setAttribute('name', 'amazon-ec2-instance');
el.setAttribute('label', 'EC2');
assert.ok(
  el.innerHTML.includes('aria-label="EC2"'),
  'label becomes aria-label',
);

// @ts-expect-error property assignment on custom element
el.icon = AmazonEc2;
assert.ok(el.innerHTML.includes('viewBox'), 'icon property renders directly');

console.log('@aws-icons/web-components smoke test passed');
